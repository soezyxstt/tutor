import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLocale, resolveLanguagePreference, languageCookie, languageHref } from '../src/i18n/language.ts';
import { resolveCourseLocale } from '../src/i18n/course-localization.ts';

test('system default follows the first browser language', () => {
  assert.equal(detectLocale(['id-ID', 'en-US']), 'id');
  assert.equal(detectLocale(['en-GB', 'id-ID']), 'en');
  assert.equal(detectLocale(['ja-JP']), 'en');
  assert.equal(detectLocale([]), 'en');
});

test('URL preference wins, then shared cookie, then local storage; invalid values are ignored', () => {
  assert.equal(resolveLanguagePreference({search:'?lang=en',cookie:'tutor_language=id',stored:'system'}), 'en');
  assert.equal(resolveLanguagePreference({search:'?lang=system',cookie:'tutor_language=id'}), 'system');
  assert.equal(resolveLanguagePreference({search:'?lang=invalid',cookie:'tutor_language=id',stored:'en'}), 'id');
  assert.equal(resolveLanguagePreference({cookie:'tutor_language=invalid',stored:'en'}), 'en');
  assert.equal(resolveLanguagePreference({stored:'invalid'}), 'system');
});

test('language cookie is shared only across the Tutor domain', () => {
  assert.match(languageCookie('id','demo.tutor.adihnursyam.com',true), /Domain=tutor\.adihnursyam\.com/);
  assert.match(languageCookie('en','tutor.adihnursyam.com',true), /; Secure/);
  assert.doesNotMatch(languageCookie('id','evil-tutor.adihnursyam.com',true), /Domain=/);
  assert.doesNotMatch(languageCookie('id','localhost',false), /Domain=|Secure/);
});

test('cross-course links retain system preference, current query and anchor', () => {
  assert.equal(languageHref('https://demo.tutor.adihnursyam.com/?item=one#step','system'), 'https://demo.tutor.adihnursyam.com/?item=one&lang=system#step');
  assert.equal(languageHref('/admin?lang=id','en'), '/admin?lang=en');
});

const source = {
  slug:'sample',code:'M100',title:'Mata kuliah',subtitle:'Ringkasan',domain:'example.com',
  modules:[{id:'m1',title:'Bab',items:[{
    id:'p1',kind:'problem',slug:'soal-satu',title:'Soal',difficulty:'dasar',estimatedMinutes:5,
    statement:'Pernyataan',finalAnswer:'Hasil',steps:[
      {id:'s1',title:'Pertama',content:'Isi pertama',checkpoint:{prompt:'Pilih',options:[{id:'a',label:'Benar'},{id:'b',label:'Salah'}],correctOptionId:'a'}},
      {id:'s2',title:'Kedua',content:'Isi kedua'},
    ],
  }]}],
};
const complete = {
  title:'Problem',statement:'Statement',finalAnswer:'Result',
  steps:[
    {id:'s2',title:'Second',content:'Second content'},
    {id:'s1',title:'First',content:'First content',checkpoint:{prompt:'Choose',options:[{id:'a',label:'Correct'},{id:'b',label:'Incorrect'}]}},
  ],
};

test('source locale needs no translation and missing translations are reported', () => {
  assert.deepEqual(resolveCourseLocale(source,'id').missingItemIds, []);
  assert.deepEqual(resolveCourseLocale(source,'en').missingItemIds, ['p1']);
  assert.equal(resolveCourseLocale(source,'en').course.modules[0].items[0].statement, 'Pernyataan');
});

test('translation completeness checks content rather than metadata presence', () => {
  const config={...source,translations:{en:{title:'Course',modules:{m1:{title:'Chapter',items:{p1:{title:'Problem'}}}}}}};
  const result=resolveCourseLocale(config,'en');
  assert.deepEqual(result.missingItemIds,['p1']);
  assert.deepEqual(result.partiallyTranslatedItemIds,['p1']);
  assert.equal(result.course.modules[0].items[0].statement,'Pernyataan');
});

test('complete translations preserve step order, stable navigation IDs, and answer keys', () => {
  const config={...source,translations:{en:{title:'Course',modules:{m1:{title:'Chapter',items:{p1:{...complete,id:'changed',slug:'changed',estimatedMinutes:99,steps:complete.steps.map(s=>s.id==='s1'?{...s,checkpoint:{...s.checkpoint,correctOptionId:'b'}}:s)}}}}}}};
  const result=resolveCourseLocale(config,'en');
  const item=result.course.modules[0].items[0];
  assert.deepEqual(result.missingItemIds,[]);
  assert.deepEqual(result.translatedItemIds,['p1']);
  assert.equal(item.id,'p1');
  assert.equal(item.slug,'soal-satu');
  assert.equal(item.estimatedMinutes,5);
  assert.deepEqual(item.steps.map(s=>s.id),['s1','s2']);
  assert.equal(item.steps[0].checkpoint.correctOptionId,'a');
  assert.equal(item.steps[0].title,'First');
  assert.equal(item.steps[1].title,'Second');
  assert.equal(source.modules[0].items[0].title,'Soal');
});

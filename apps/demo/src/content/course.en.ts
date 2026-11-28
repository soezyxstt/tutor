import type { CourseTranslation } from '@tutor/core';

const math = String.raw;

/** English text overlays preserve source IDs, numerical values, answer keys, and formulas. */
export const demoEnglish: CourseTranslation = {
  title: 'Mechanics & Vibrations',
  subtitle: 'Lessons, practice & worked solutions',
  semester: 'Semester 1',
  modules: {
    'mod-osilasi': {
      title: 'Damped Oscillations',
      items: {
        'mat-osilasi-dasar': {
          title: 'How Damping Changes Oscillations',
          tags: ['lessons', 'oscillations'],
          keyFormula: {
            label: 'Damping ratio and natural frequency',
            note: 'Use the damping ratio to decide whether the system oscillates or returns without oscillating.',
          },
          body: math`Real mechanical systems lose mechanical energy through fluid friction or internal friction. A simple linear model makes the damping force proportional to velocity: $F_d = -c\dot{x}$. The minus sign means that the damping force opposes motion.

### Compare the three damping regimes

We use the **damping ratio**, $\zeta$, to compare damping with the amount that just prevents oscillation. The damping ratio helps you choose the right form of the motion equation.

| Regime | Condition on $\zeta$ | Physical behavior |
| --- | --- | --- |
| **Underdamped** | $0 < \zeta < 1$ | The system oscillates while its amplitude decreases as $e^{-\zeta\omega_n t}$ |
| **Critically damped** | $\zeta = 1$ | After release from rest, the system returns to equilibrium fastest without crossing it |
| **Overdamped** | $\zeta > 1$ | After release from rest, the system returns more slowly without oscillating |

### Follow the energy loss

The rate of mechanical energy loss is

$$\frac{dE}{dt} = -c\dot{x}^2 \le 0.$$

The squared velocity cannot be negative. With $c \ge 0$, the damping force therefore cannot add mechanical energy. No external driving force supplies energy in this model.`,
          derivations: [
            {
              id: 'deriv-karakteristik',
              title: 'Derive the characteristic equation and its roots',
              content: math`We try $x(t) = e^{rt}$ because its derivatives remain proportional to $e^{rt}$. Substitute into $\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0$, then divide by $e^{rt}$:

$$r^2 + 2\zeta\omega_n r + \omega_n^2 = 0 \implies r_{1,2} = -\zeta\omega_n \pm \omega_n\sqrt{\zeta^2 - 1}.$$

The sign of $\zeta^2 - 1$ determines whether the roots contain an imaginary part. That imaginary part produces oscillation.`,
            },
            {
              id: 'deriv-qfactor',
              title: 'Relate the damping ratio to the quality factor',
              content: math`For a lightly damped oscillator, the **quality factor** is $Q = \frac{1}{2\zeta}$. The quality factor measures how well the oscillator retains energy. A higher $Q$ means more oscillation cycles before substantial energy loss.`,
            },
          ],
          checkpoints: [
            'I can obtain m ẍ + c ẋ + k x = 0 from a free-body diagram.',
            'I can identify underdamped, critically damped, and overdamped motion from ζ.',
            'I can explain why ωd is smaller than ωn for an underdamped system with c > 0.',
          ],
        },
        'prac-osilasi-cek': {
          title: 'Practice: Damping Regimes and Frequency',
          tags: ['practice', 'oscillations'],
          intro: 'Use this practice to check your understanding before the full exam problems. Choose one answer for each question. A correct answer should agree with both the damping condition and the frequency relation.',
          questions: [
            {
              id: 'q1',
              prompt: math`A spring-mass system has $m = 2\,\text{kg}$ and $k = 8\,\text{N/m}$. Find its critical damping coefficient $c_{\text{crit}}$.`,
              options: [
                { id: 'a', label: math`$4\,\text{N}\cdot\text{s/m}$` },
                { id: 'b', label: math`$8\,\text{N}\cdot\text{s/m}$` },
                { id: 'c', label: math`$16\,\text{N}\cdot\text{s/m}$` },
              ],
              hint: 'Set ζ = 1 in the damping-ratio definition. This condition gives c_crit = 2√(km).',
              explanation: math`Critical damping occurs at $\zeta = 1$. We therefore use $c_{\text{crit}} = 2\sqrt{km} = 2\sqrt{8 \times 2} = 2(4) = 8\,\text{N}\cdot\text{s/m}$.`,
            },
            {
              id: 'q2',
              prompt: math`We increase the damping coefficient $c$ of an underdamped oscillator while keeping $\zeta < 1$. How does the oscillation period $T_d$ change?`,
              options: [
                { id: 'a', label: math`The period $T_d$ increases, so each cycle takes longer` },
                { id: 'b', label: math`The period $T_d$ decreases, so each cycle takes less time` },
                { id: 'c', label: math`The period $T_d$ stays equal to $T_n$` },
              ],
              hint: 'Compare ωd = ωn √(1 − ζ²) with Td = 2π / ωd.',
              explanation: math`A larger $c$ increases $\zeta$. The frequency $\omega_d = \omega_n\sqrt{1 - \zeta^2}$ therefore decreases. A smaller frequency gives a longer period because $T_d = 2\pi/\omega_d$.`,
            },
          ],
        },
        'prob-pegas-teredam': {
          title: 'Analyze a Damped Spring-Mass System',
          source: 'Midterm 2024 · No. 1',
          exam: { term: 'UTS' },
          tags: ['oscillations', 'rk4', 'damping'],
          statement: math`A block of mass $m = 1.0\,\text{kg}$ hangs from an ideal spring with stiffness $k = 12.0\,\text{N/m}$. A viscous damper has coefficient $c = 0.40\,\text{N}\cdot\text{s/m}$. At $t = 0$, we pull the block $x_0 = 1.0\,\text{m}$ from equilibrium and release it from rest ($v_0 = 0$).`,
          given: [
            math`Block mass $m = 1.0\,\text{kg}$`,
            math`Spring stiffness $k = 12.0\,\text{N/m}$`,
            math`Damping coefficient $c = 0.40\,\text{N}\cdot\text{s/m}$`,
            math`Initial conditions $x(0) = 1.0\,\text{m}$ and $\dot{x}(0) = 0$`,
          ],
          asked: math`Find the natural frequency $\omega_n$, damping ratio $\zeta$, damping regime, damped angular frequency $\omega_d$, and position $x(t)$.`,
          simulation: {
            title: 'Damped Harmonic Oscillator (RK4 Solver)',
            caption: 'Change the parameters or ask the AI tutor to adjust damping. Compare the resulting motion with the damping ratio.',
            params: [{key:'mass',label:'Mass (m)'},{key:'damping',label:'Damping (c)'},{key:'stiffness',label:'Stiffness (k)'}],
          },
          steps: [
            {
              id: 'step-1',
              title: 'Write the equation of motion',
              summary: 'Apply Newton’s second law to the spring force and damping force.',
              hint: 'The spring force (−kx) opposes displacement. The damping force (−cv) opposes velocity.',
              checkpoint: {
                prompt: 'The block moves downward (+v). Which way does the damping force act?',
                options: [
                  {id:'up',label:'Upward (−cẋ)',feedback:'Correct. Viscous damping opposes the current direction of motion.'},
                  {id:'down',label:'Downward (+cẋ)',feedback:'A force along the velocity would add mechanical energy. A passive damper removes mechanical energy.'},
                ],
              },
              rationale: {
                whyThisMethod: math`The standard form $\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0$ lets you read the natural frequency and damping ratio from the coefficients.`,
                whyNotAlternative: 'We cannot assume constant mechanical energy because viscous damping removes mechanical energy.',
                commonPitfall: math`Keep the signs when moving $-kx - c\dot{x}$ to the left. The damping term becomes $+c\dot{x}$, not $-c\dot{x}$.`,
              },
              content: math`We measure displacement downward from equilibrium. The equilibrium spring force already balances weight, so the additional forces are $-kx$ and $-c\dot{x}$:

$$m\ddot{x} = -kx - c\dot{x} \quad \Longrightarrow \quad m\ddot{x} + c\dot{x} + kx = 0.$$

Divide by $m$. We compare the coefficients with the standard form:

$$\ddot{x} + 2\zeta\omega_n\dot{x} + \omega_n^2 x = 0.$$`,
            },
            {
              id:'step-2',
              title:'Calculate the natural frequency ωₙ and damping ratio ζ',
              summary:'Substitute m = 1.0 kg, k = 12.0 N/m, and c = 0.40 N·s/m.',
              hint:'Use ωₙ = √(k/m) and ζ = c / (2√(km)).',
              content: math`The natural angular frequency describes the system without damping:

$$\omega_n = \sqrt{\frac{k}{m}} = \sqrt{\frac{12.0}{1.0}} \approx 3.464\,\text{rad/s}.$$

Now calculate the dimensionless damping ratio:

$$\zeta = \frac{c}{2\sqrt{km}} = \frac{0.40}{2\sqrt{12.0 \times 1.0}} = \frac{0.40}{6.928} \approx 0.0577.$$

The ratio satisfies $0 < \zeta < 1$. We therefore choose the **underdamped** solution, which contains a decaying oscillation.`,
            },
            {
              id:'step-3',
              title:'Find the damped angular frequency ωd',
              summary:'Account for the effect of damping on oscillation frequency.',
              content: math`An underdamped system oscillates at

$$\omega_d = \omega_n\sqrt{1 - \zeta^2} = 3.464\sqrt{1 - (0.0577)^2} \approx 3.458\,\text{rad/s}.$$

The damping ratio is small, so $\omega_d$ is close to $\omega_n$. Use $\omega_d$ in the sine and cosine terms of the solution.`,
            },
            {
              id:'step-4',
              title:'Apply the initial conditions to find x(t)',
              summary:'Use x(0) = 1.0 m and v(0) = 0 to find the constants.',
              hint:'The underdamped solution is x(t) = e^(-ζωₙt) [A cos(ωd t) + B sin(ωd t)].',
              content: math`At $t = 0$, the exponential and cosine equal one, while the sine equals zero. The position condition therefore gives $A = 1.0\,\text{m}$. Differentiate the solution and apply the velocity condition:

$$\dot{x}(0) = -\zeta\omega_n A + \omega_d B = 0 \implies B = \frac{\zeta\omega_n}{\omega_d} A = \frac{0.20}{3.458}(1.0) \approx 0.0578\,\text{m}.$$

We now have both constants:

$$x(t) = e^{-0.20t}\big(\cos(3.458t) + 0.0578\sin(3.458t)\big)\,\text{m}.$$`,
            },
          ],
          finalAnswer: math`The system is **underdamped**, with $\omega_n = 3.464\,\text{rad/s}$, $\zeta = 0.0577$, and $\omega_d = 3.458\,\text{rad/s}$:

$$x(t) = e^{-0.20t}\big(\cos(3.458t) + 0.0578\sin(3.458t)\big)\,\text{m}.$$`,
          takeaway: math`Critical damping occurs at $c_{\text{crit}} = 2\sqrt{km} \approx 6.93\,\text{N}\cdot\text{s/m}$. Compare this threshold with the selected damping coefficient when you change the simulation parameters.`,
        },
        'prob-energi-amplitudo': {
          title:'Find the Time for Energy to Halve',
          source:'Midterm 2023 · No. 1',
          exam:{term:'UTS'},
          statement:math`A lightly damped oscillator has mass $m = 0.5\,\text{kg}$ and damping coefficient $c = 0.10\,\text{N}\cdot\text{s/m}$. Estimate the time for its mechanical energy to fall to half its initial value.`,
          given:[math`$m = 0.5\,\text{kg}$`,math`$c = 0.10\,\text{N}\cdot\text{s/m}$`,math`Target energy $E(t) = \frac{1}{2} E_0$`],
          asked:math`The half-energy time $t_{1/2}$, in seconds.`,
          steps:[
            {id:'e-1',title:'Relate energy to the amplitude envelope',summary:'Oscillator energy scales with the square of amplitude.',content:math`For light damping, the amplitude follows $A(t) = A_0 e^{-\gamma t}$, where $\gamma = \frac{c}{2m}$. The slowly varying energy scales as $A(t)^2$. Squaring the amplitude therefore doubles the decay exponent:

$$E(t) \approx E_0 e^{-2\gamma t} = E_0 e^{-(c/m)t}.$$`},
            {id:'e-2',title:'Solve for t when E(t) = E₀ / 2',summary:'Take the natural logarithm of both sides.',content:math`Set the energy ratio to one-half. We use the natural logarithm to bring the unknown time out of the exponent:

$$\frac{1}{2} = e^{-(c/m)t_{1/2}} \implies t_{1/2} = \frac{m}{c}\ln 2 = \frac{0.5}{0.10}(0.6931) \approx 3.47\,\text{s}.$$`},
          ],
          finalAnswer:math`The mechanical energy falls to half its initial value after approximately **$t_{1/2} \approx 3.47\,\text{s}$**, under the light-damping approximation.`,
        },
      },
    },
    'mod-rotasi': {
      title:'Rigid-Body Dynamics',
      items:{
        'mat-momen-inersia':{
          title:'Moment of Inertia and Rolling Motion',
          keyFormula:{label:'Rolling without slipping',note:'Static friction supplies the required torque without dissipating energy in ideal rolling on a fixed surface.'},
          body:math`A rolling object moves forward while it rotates about its center of mass. We must include both motions when finding kinetic energy:

$$K = \frac{1}{2} M v_{\text{cm}}^2 + \frac{1}{2} I_{\text{cm}} \omega^2 = \frac{1}{2} M v_{\text{cm}}^2 \left(1 + \frac{I_{\text{cm}}}{M R^2}\right).$$

The **moment of inertia**, $I_{\text{cm}}$, measures how mass distribution affects resistance to changes in rotation. The ratio $\beta = I_{\text{cm}}/(MR^2)$ tells you how much kinetic energy belongs to rotation. A larger $\beta$ gives less acceleration down the same incline.`,
        },
        'prob-silinder-miring':{
          title:'A Solid Cylinder Rolls Down an Incline',
          source:'Midterm 2024 · No. 2',
          exam:{term:'UTS'},
          statement:math`A uniform solid cylinder has mass $M$, radius $R$, and moment of inertia $I_{\text{cm}} = \frac{1}{2}MR^2$. We release the cylinder from rest on an incline with angle $\theta = 30^\circ$. The cylinder rolls down without slipping.`,
          given:[math`Moment of inertia $I_{\text{cm}} = \frac{1}{2}MR^2$`,math`Incline angle $\theta = 30^\circ$`,math`Gravitational acceleration $g = 9.8\,\text{m/s}^2$`],
          asked:math`Find the center-of-mass acceleration $a_{\text{cm}}$ and minimum static friction coefficient $\mu_{s,\min}$ needed to avoid slipping.`,
          steps:[
            {id:'r-1',title:'Write the force and torque equations',summary:'Static friction fs acts up the incline.',content:math`We take downhill as the positive direction. Gravity pulls downhill, while static friction acts uphill:

$$Mg\sin\theta - f_s = M a_{\text{cm}}.$$

Static friction also produces the torque about the center of mass. We use $\alpha = a_{\text{cm}}/R$ because the cylinder does not slip:

$$f_s R = I_{\text{cm}}\alpha = \left(\frac{1}{2}MR^2\right)\left(\frac{a_{\text{cm}}}{R}\right) \implies f_s = \frac{1}{2} M a_{\text{cm}}.$$`},
            {id:'r-2',title:'Eliminate fs to find acm',summary:'Substitute the friction force into the force equation.',content:math`The torque equation expresses friction in terms of acceleration. Substitute that expression into the force equation:

$$Mg\sin\theta - \frac{1}{2}M a_{\text{cm}} = M a_{\text{cm}} \implies a_{\text{cm}} = \frac{2}{3}g\sin\theta.$$

For $\theta = 30^\circ$, we have $\sin 30^\circ = 0.5$:

$$a_{\text{cm}} = \frac{2}{3}(9.8)(0.5) \approx 3.27\,\text{m/s}^2.$$`},
            {id:'r-3',title:'Find the minimum static friction coefficient',summary:'Compare the required friction with its maximum value, μs N.',content:math`The surface can supply at most $\mu_s N$ of static friction. The required friction must stay below this limit:

$$f_s = \frac{1}{2}M a_{\text{cm}} = \frac{1}{3}Mg\sin\theta \le \mu_s Mg\cos\theta.$$

At the minimum coefficient, the inequality becomes an equality:

$$\mu_{s,\min} = \frac{1}{3}\tan\theta = \frac{1}{3}\tan 30^\circ \approx 0.192.$$`},
          ],
          finalAnswer:math`The center-of-mass acceleration is **$a_{\text{cm}} = \frac{2}{3}g\sin\theta \approx 3.27\,\text{m/s}^2$**. Rolling without slipping requires **$\mu_s \ge \mu_{s,\min} = \frac{1}{3}\tan 30^\circ \approx 0.192$**.`,
        },
      },
    },
  },
};

import { questions2023, practice2023 } from "./y2023";
import { questions2024, practice2024 } from "./y2024";
import { questions2025, practice2025 } from "./y2025";
import { questionsUts12023 } from "./uts1-2023";
import { questionsUts12024 } from "./uts1-2024";
import { questionsUts12025 } from "./uts1-2025";
export const questions = [
  ...questionsUts12025,
  ...questions2025,
  ...questionsUts12024,
  ...questions2024,
  ...questionsUts12023,
  ...questions2023,
];
export const practice = [...practice2023, ...practice2024, ...practice2025];
export const reference = {
  url: "https://drive.google.com/file/d/1UnGPrB_172dW6P9SGHRdpHQbjk2TleJJ/view",
  name: "Pengukuran Teknik, Bagian 3 (Rev. 2022)",
};
export const archiveUrl =
  "https://drive.google.com/drive/folders/1yDxh5kA1s5m4ZNPbKlmjoymkVJrD1END";

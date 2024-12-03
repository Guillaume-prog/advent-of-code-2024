import { loadInput } from "@util/main";

// Parse phase
const reports = loadInput(__dirname, true).map((line) =>
  line.split(/\s+/g).map((el) => Number.parseInt(el)),
);

// Part 1

function isReportSafe(report: number[]): { safe: boolean; i: number | null } {
  let old_slope_sign: number | null = null;

  for (let i = 1; i < report.length; i++) {
    const val = report[i - 1] - report[i];
    const slope_val = Math.abs(val);
    const slope_sign = val / Math.abs(val);

    if (slope_val < 1 || slope_val > 3) return { safe: false, i: i - 1 };
    if (old_slope_sign != null && old_slope_sign != slope_sign)
      return { safe: false, i: i - 1 };

    old_slope_sign = slope_sign;
  }

  return { safe: true, i: null };
}

// reports.forEach((report) => {
//   console.log(report, isReportSafe(report) ? "Safe" : "Unsafe");
// });

const num_safe_reports = reports.filter(
  (report) => isReportSafe(report).safe,
).length;
console.log("Part 1:", num_safe_reports);

// Part 2

function badLevelFilter(report: number[]): boolean {
  const { safe, i } = isReportSafe(report);
  if (safe) return true;

  // REmove bad level from array and try again
  const new_report = report.filter((_, index) => index != i);
  return isReportSafe(new_report).safe;
}

reports.forEach((report) => {
  console.log(report, badLevelFilter(report) ? "Safe" : "Unsafe");
});

const num_safe_reports_2 = reports.filter(badLevelFilter).length;
console.log("\nPart 2:", num_safe_reports_2);

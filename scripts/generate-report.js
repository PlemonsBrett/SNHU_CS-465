const reporter = require("cucumber-html-reporter");
const path = require("path");

/**
 * Generate HTML report from Cucumber JSON results
 * This script creates a beautiful HTML report with screenshots and detailed test results
 */

const options = {
	theme: "bootstrap",
	jsonFile: "reports/cucumber-report.json",
	output: "reports/cucumber-report.html",
	reportSuiteAsScenarios: true,
	scenarioTimestamp: true,
	launchReport: false, // Set to true to auto-open report in browser
	metadata: {
		"App Name": "Travlr Getaways",
		"Test Environment": process.env.NODE_ENV || "test",
		"Browser": process.env.BROWSER || "chromium",
		"Platform": process.platform,
		"Executed": new Date().toISOString(),
	},
	failedSummaryReport: true,
	brandTitle: "Travlr Getaways E2E Test Results",
	name: "End-to-End Test Report",
};

// Check if JSON report exists before generating HTML
const fs = require("fs");
const jsonReportPath = path.resolve(options.jsonFile);

if (fs.existsSync(jsonReportPath)) {
	try {
		reporter.generate(options);
		console.log("✅ HTML report generated successfully!");
		console.log(`📊 Report location: ${path.resolve(options.output)}`);
		
		// Also log summary statistics
		const jsonData = JSON.parse(fs.readFileSync(jsonReportPath, "utf8"));
		let totalScenarios = 0;
		let passedScenarios = 0;
		let failedScenarios = 0;
		
		for (const feature of jsonData) {
			for (const element of feature.elements || []) {
				if (element.type === "scenario") {
					totalScenarios++;
					const isScenarioPassed = element.steps.every(step => 
						step.result && step.result.status === "passed"
					);
					if (isScenarioPassed) {
						passedScenarios++;
					} else {
						failedScenarios++;
					}
				}
			}
		}
		
		console.log("\n📈 Test Summary:");
		console.log(`   Total Scenarios: ${totalScenarios}`);
		console.log(`   ✅ Passed: ${passedScenarios}`);
		console.log(`   ❌ Failed: ${failedScenarios}`);
		console.log(`   📊 Success Rate: ${totalScenarios > 0 ? Math.round((passedScenarios / totalScenarios) * 100) : 0}%`);
		
	} catch (error) {
		console.error("❌ Error generating HTML report:", error.message);
		process.exit(1);
	}
} else {
	console.error("❌ JSON report not found at:", jsonReportPath);
	console.log("💡 Make sure to run Cucumber tests first to generate the JSON report.");
	process.exit(1);
} 
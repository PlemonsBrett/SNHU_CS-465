#!/usr/bin/env node

/**
 * Test setup script for SNHU CS-465 testing framework
 * This script prepares the test environment and validates prerequisites
 */

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

console.log("🚀 Setting up SNHU CS-465 Test Environment...\n");

// ============================================================================
// DIRECTORY CREATION
// ============================================================================

console.log("📁 Creating test directories...");

const directories = [
	"reports",
	"reports/screenshots",
	"reports/artifacts",
	"tests/step-definitions",
	"tests/support",
	"tests/features", 
	"tests/hoppscotch"
];

directories.forEach(dir => {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
		console.log(`   ✅ Created: ${dir}`);
	} else {
		console.log(`   ✔️  Exists: ${dir}`);
	}
});

// ============================================================================
// DEPENDENCY VERIFICATION
// ============================================================================

console.log("\n🔍 Verifying dependencies...");

const requiredDependencies = [
	"@cucumber/cucumber",
	"@playwright/test", 
	"playwright",
	"cucumber-html-reporter",
	"cross-env"
];

try {
	const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
	const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
	
	requiredDependencies.forEach(dep => {
		if (allDeps[dep]) {
			console.log(`   ✅ ${dep}: ${allDeps[dep]}`);
		} else {
			console.log(`   ❌ Missing: ${dep}`);
			process.exit(1);
		}
	});
} catch (error) {
	console.error("❌ Error reading package.json:", error.message);
	process.exit(1);
}

// ============================================================================
// HOPPSCOTCH CLI VERIFICATION
// ============================================================================

console.log("\n🔌 Checking Hoppscotch CLI...");

try {
	const hoppVersion = execSync("hopp --version", { encoding: "utf8" }).trim();
	console.log(`   ✅ Hoppscotch CLI: ${hoppVersion}`);
} catch (error) {
	console.log("   ⚠️  Hoppscotch CLI not found globally");
	console.log("   💡 Install with: pnpm install -g @hoppscotch/cli");
	
	// Check if it's available locally
	try {
		execSync("npx @hoppscotch/cli --version", { encoding: "utf8" });
		console.log("   ✅ Hoppscotch CLI available via npx");
	} catch (localError) {
		console.log("   ❌ Hoppscotch CLI not available locally either");
	}
}

// ============================================================================
// PLAYWRIGHT BROWSER INSTALLATION
// ============================================================================

console.log("\n🎭 Checking Playwright browsers...");

try {
	// Check if browsers are installed by looking for the browser directory
	const playwrightPath = path.join("node_modules", "@playwright", "test");
	if (fs.existsSync(playwrightPath)) {
		console.log("   ✅ Playwright package found");
		
		// Try to verify browser installation
		try {
			execSync("npx playwright install --dry-run", { stdio: "pipe" });
			console.log("   ✅ Playwright browsers are installed");
		} catch (browserError) {
			console.log("   ⚠️  Playwright browsers may need installation");
			console.log("   💡 Run: npx playwright install");
		}
	} else {
		console.log("   ❌ Playwright package not found");
	}
} catch (error) {
	console.log("   ⚠️  Could not verify Playwright installation");
}

// ============================================================================
// APPLICATION SERVER CHECK
// ============================================================================

console.log("\n🌐 Checking application server...");

const http = require("http");

function checkServer(url, timeout = 5000) {
	return new Promise((resolve) => {
		const req = http.get(url, (res) => {
			resolve({ status: res.statusCode, accessible: true });
		});
		
		req.on("error", () => {
			resolve({ accessible: false });
		});
		
		req.setTimeout(timeout, () => {
			req.destroy();
			resolve({ accessible: false });
		});
	});
}

checkServer("http://localhost:3000").then(result => {
	if (result.accessible) {
		console.log(`   ✅ Server accessible (Status: ${result.status})`);
	} else {
		console.log("   ⚠️  Server not accessible on localhost:3000");
		console.log("   💡 Start with: pnpm start");
	}
});

// ============================================================================
// ENVIRONMENT FILE CHECK
// ============================================================================

console.log("\n🔧 Checking environment configuration...");

const envFiles = [".env", ".env.example"];
envFiles.forEach(file => {
	if (fs.existsSync(file)) {
		console.log(`   ✅ Found: ${file}`);
	} else {
		console.log(`   ⚠️  Missing: ${file}`);
		if (file === ".env") {
			console.log("   💡 Copy .env.example to .env and configure");
		}
	}
});

// ============================================================================
// TEST FILE VALIDATION
// ============================================================================

console.log("\n📋 Validating test files...");

const criticalFiles = [
	"tests/support/world.js",
	"tests/step-definitions/common.js",
	"cucumber.config.js",
	"scripts/generate-report.js"
];

criticalFiles.forEach(file => {
	if (fs.existsSync(file)) {
		console.log(`   ✅ ${file}`);
	} else {
		console.log(`   ❌ Missing: ${file}`);
	}
});

// ============================================================================
// FEATURE FILE VALIDATION
// ============================================================================

console.log("\n📝 Checking feature files...");

const featureDir = "tests/features";
if (fs.existsSync(featureDir)) {
	const featureFiles = fs.readdirSync(featureDir).filter(file => file.endsWith(".feature"));
	console.log(`   ✅ Found ${featureFiles.length} feature files:`);
	featureFiles.forEach(file => {
		console.log(`      - ${file}`);
	});
} else {
	console.log("   ❌ Feature directory not found");
}

// ============================================================================
// HOPPSCOTCH TEST COLLECTIONS
// ============================================================================

console.log("\n🦗 Checking Hoppscotch test collections...");

const hoppscotchDir = "tests/hoppscotch";
if (fs.existsSync(hoppscotchDir)) {
	const collections = fs.readdirSync(hoppscotchDir).filter(file => file.endsWith(".json"));
	console.log(`   ✅ Found ${collections.length} test collections:`);
	collections.forEach(file => {
		console.log(`      - ${file}`);
	});
	
	// Validate main test collection
	const mainCollection = "travlr-api-tests.json";
	if (collections.includes(mainCollection)) {
		try {
			const collectionPath = path.join(hoppscotchDir, mainCollection);
			const collection = JSON.parse(fs.readFileSync(collectionPath, "utf8"));
			console.log(`   ✅ ${mainCollection} is valid JSON`);
			
			if (collection.folders && collection.folders.length > 0) {
				console.log(`      - Contains ${collection.folders.length} test folders`);
			}
		} catch (error) {
			console.log(`   ❌ ${mainCollection} has invalid JSON`);
		}
	}
} else {
	console.log("   ❌ Hoppscotch directory not found");
}

// ============================================================================
// PACKAGE.JSON SCRIPTS VALIDATION
// ============================================================================

console.log("\n📦 Validating package.json scripts...");

try {
	const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
	const requiredScripts = [
		"test:e2e",
		"test:smoke", 
		"test:hoppscotch",
		"test:e2e:report"
	];
	
	requiredScripts.forEach(script => {
		if (packageJson.scripts && packageJson.scripts[script]) {
			console.log(`   ✅ ${script}`);
		} else {
			console.log(`   ❌ Missing script: ${script}`);
		}
	});
} catch (error) {
	console.log("   ❌ Error validating package.json scripts");
}

// ============================================================================
// GENERATE SAMPLE TEST RUN
// ============================================================================

console.log("\n🧪 Test commands you can run:");
console.log("   pnpm test:dev          # Quick development tests");
console.log("   pnpm test:smoke        # Smoke tests only");  
console.log("   pnpm test:api          # API tests only");
console.log("   pnpm test:web          # Web UI tests only");
console.log("   pnpm test:hoppscotch   # Hoppscotch API tests");
console.log("   pnpm test:full         # Complete test suite");
console.log("   pnpm test:e2e:report   # Tests with HTML report");

// ============================================================================
// RECOMMENDATIONS
// ============================================================================

console.log("\n💡 Recommendations:");
console.log("   1. Ensure the Express server is running (pnpm start)");
console.log("   2. Seed the database with test data (pnpm seed)");
console.log("   3. Start with smoke tests (pnpm test:smoke)");
console.log("   4. Use headed mode for debugging (HEADLESS=false pnpm test:web)");
console.log("   5. Check reports in the reports/ directory after test runs");

console.log("\n✨ Test environment setup complete!");
console.log("🚀 Ready to run tests!\n");

// ============================================================================
// EXIT WITH SUCCESS
// ============================================================================

process.exit(0);
// ============================================
// Console Calculator - Math Operations Demo
// ============================================

/**
 * Add two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
function add(a, b) {
    return a + b;
}

/**
 * Subtract b from a
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Difference of a and b
 */
function subtract(a, b) {
    return a - b;
}

/**
 * Multiply two numbers
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Product of a and b
 */
function multiply(a, b) {
    return a * b;
}

/**
 * Divide a by b with safety check
 * @param {number} a - Numerator
 * @param {number} b - Denominator
 * @returns {number|string} Quotient or error message
 */
function divide(a, b) {
    if (b === 0) {
        return "❌ Error: Cannot divide by zero!";
    }
    return (a / b).toFixed(2);
}

/**
 * Calculate modulo (remainder)
 * @param {number} a - Dividend
 * @param {number} b - Divisor
 * @returns {number|string} Remainder or error message
 */
function modulo(a, b) {
    if (b === 0) {
        return "❌ Error: Cannot calculate modulo with zero!";
    }
    return a % b;
}

/**
 * Calculate power (a^b)
 * @param {number} a - Base
 * @param {number} b - Exponent
 * @returns {number} a raised to power b
 */
function power(a, b) {
    return Math.pow(a, b);
}

/**
 * Calculate square root
 * @param {number} a - Number
 * @returns {number|string} Square root or error message
 */
function squareRoot(a) {
    if (a < 0) {
        return "❌ Error: Cannot calculate square root of negative number!";
    }
    return Math.sqrt(a).toFixed(2);
}

/**
 * Main function to run all calculations and display results
 */
function runCalculations() {
    console.clear();
    console.log("%c╔════════════════════════════════════════╗", "color: #667eea; font-weight: bold; font-size: 1.2em;");
    console.log("%c║   CONSOLE CALCULATOR - TEST RESULTS   ║", "color: #667eea; font-weight: bold; font-size: 1.2em;");
    console.log("%c╚════════════════════════════════════════╝", "color: #667eea; font-weight: bold; font-size: 1.2em;");
    
    console.log("");
    console.log("%c✨ BASIC ARITHMETIC OPERATIONS", "color: #764ba2; font-weight: bold; font-size: 1.1em;");
    console.log("────────────────────────────────────────");
    
    console.log("%cAddition:", "color: #667eea; font-weight: bold;", `5 + 5 = ${add(5, 5)}`);
    console.log("%cSubtraction:", "color: #667eea; font-weight: bold;", `10 - 12 = ${subtract(10, 12)}`);
    console.log("%cMultiplication:", "color: #667eea; font-weight: bold;", `6 × 2 = ${multiply(6, 2)}`);
    console.log("%cDivision:", "color: #667eea; font-weight: bold;", `8 ÷ 3 = ${divide(8, 3)}`);
    
    console.log("");
    console.log("%c✨ ADVANCED OPERATIONS", "color: #764ba2; font-weight: bold; font-size: 1.1em;");
    console.log("────────────────────────────────────────");
    
    console.log("%cModulo (Remainder):", "color: #667eea; font-weight: bold;", `17 mod 5 = ${modulo(17, 5)}`);
    console.log("%cPower:", "color: #667eea; font-weight: bold;", `2^10 = ${power(2, 10)}`);
    console.log("%cSquare Root:", "color: #667eea; font-weight: bold;", `√144 = ${squareRoot(144)}`);
    
    console.log("");
    console.log("%c✨ ERROR HANDLING TESTS", "color: #764ba2; font-weight: bold; font-size: 1.1em;");
    console.log("────────────────────────────────────────");
    
    console.log("%cDivision by Zero:", "color: #667eea; font-weight: bold;", divide(10, 0));
    console.log("%cSquare Root of Negative:", "color: #667eea; font-weight: bold;", squareRoot(-9));
    
    console.log("");
    console.log("%c✅ All tests completed successfully!", "color: #28a745; font-weight: bold; font-size: 1.1em;");
    console.log("");
}

/**
 * Clear console display
 */
function clearConsole() {
    console.clear();
    console.log("%c📋 Console cleared! Click 'Run Calculations' to see results again.", "color: #667eea; font-style: italic;");
}

// Auto-run calculations when page loads
console.log("%c🚀 Calculator loaded! Check the page for instructions.", "color: #667eea; font-weight: bold; font-size: 1.1em;");
runCalculations();
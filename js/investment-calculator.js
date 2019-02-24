/**
 * JS for the Make Me Rich App
 * Copyright 2017, Zhen Wang
 */

"use strict;"				// best practice to use this directive

var startingAge 				= 0;
var retirementAge 				= 0;
var totalYears 					= 0;
var startingSalary 				= 0;
var annualSavingPercent 		= 0;
var annualRaisePercent 			= 0;
var annualInterestPercent 		= 0;

var summaryTable;
var detailedTable;  

function initialize() {

	// Find <table> elements with thier ids:
	summaryTable = document.getElementById("summaryTable");
	detailedTable = document.getElementById("detailedTable"); // no siginificant difference between '' and "" in js.

	console.log(summaryTable);
	console.log("");
	console.log(detailedTable);
}

function clearInputs(form) {
	var formElements = form.elements;
	for (var i=0; i< formElements.length; i++)
		formElements[i].value="";

	// Enable related button:
	document.getElementById("makeMeRichButton").disabled = false;
	document.getElementById("makeMeRichButton").className = "button";
	document.getElementById("defaultButton").disabled = false;
	document.getElementById("defaultButton").className = "button";

    summaryTable.style.visibility = "hidden";
    detailedTable.style.visibility = "hidden";
}

function loadDefaults(form) {
	form.reset();
}

function getNumValue(id) {
	return Number(document.getElementById(id).value);
}

function runMakeMeRich(form) {
	if (!form.checkValidity()) {
		// Disable related button:
				document.getElementById("makeMeRichButton").disabled = true;
				document.getElementById("makeMeRichButton").className = "button disabled";
				document.getElementById("defaultButton").disabled = true;
				document.getElementById("defaultButton").className = "button disabled";

		// alert("See highlighted input boxes, there are input errors");
	} else {
		//Get the input value from users:		
		startingAge 			= getNumValue("startingAgeInput");
		retirementAge 			= getNumValue("retirementAgeInput");
		startingSalary 			= getNumValue("startingSalaryInput"); 
		annualSavingPercent 	= getNumValue("annualSavingPercentInput");  
		annualRaisePercent 		= getNumValue("annualRaisePercentInput"); 
		annualInterestPercent 	= getNumValue("annualInterestPercentInput"); 

		totalYears = retirementAge - startingAge;
		
		console.log("******** User's input values ********")
		console.log("startingAge   			   :", startingAgeInput);
		console.log("retirementAge    		   :", retirementAgeInput);
		console.log("startingSalaryInput 	   :", startingSalaryInput);
		console.log("annualSavingPercent       :", annualSavingPercentInput);
		console.log("annualRaisePercent        :", annualRaisePercentInput);
		console.log("annualInterestPercent     :", annualInterestPercentInput);

		console.log("");	

		/* calculations */
		var currentSalary = startingSalary;
		var currentSaving = currentSalary * annualSavingPercent * 0.01;

		var currentAge 				= 0;
		var currentEarnedInterest 	= 0;
		var totalEarnedSalary 		= 0;
		var totalSavings 			= 0;
		var totalEarnedInterest 	= 0;
		var totalEndingBalance 		= 0;
		var currentRow 				= 1; // start after the heading, row 0

		clearResultsTable(detailedTable);

		console.log("****************** User's Strategy *****************")
		console.log("Age   Salary    Savings      Interest     Retirement");


		if (totalYears>1) {			
				// Create an empty <tr> element and add it to the 2nd position of the table:
				for (i = 0; i < totalYears + 1; i++)
				{
					currentRow = detailedTable.insertRow(i +1);

					// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
					currentAge = startingAge +i;		
					currentRow.insertCell(0).innerHTML = currentAge; // Add some text to the new cells.

	    			currentRow.insertCell(1).innerHTML = Math.round(currentSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    			totalEarnedSalary = totalEarnedSalary + currentSalary;
	    			
	    			currentSaving = currentSalary * annualSavingPercent * 0.01;
	    			currentRow.insertCell(2).innerHTML = Math.round(currentSaving).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    			currentSalary = currentSalary + currentSalary * annualRaisePercent * 0.01;

	    			totalSavings = totalSavings + currentSaving;

	    			currentEarnedInterest = currentEarnedInterest + (currentSaving + currentEarnedInterest) * annualInterestPercent * 0.01;
	    			currentRow.insertCell(3).innerHTML = Math.round(currentEarnedInterest).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	    			totalEarnedInterest = totalEarnedInterest + currentEarnedInterest;

	    			totalEndingBalance = totalEndingBalance + currentSaving + currentEarnedInterest;
	    			currentRow.insertCell(4).innerHTML = Math.round(totalEndingBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");   	
					
					// write debugging info to the console
					console.log(
						leftPadString(formatNumberWithCommas(currentAge),  ' ', 3)
						+ leftPadString(formatNumberWithCommas(currentSalary),' ',9)
						+ leftPadString(formatNumberWithCommas(currentSaving), ' ',11)
						+ leftPadString(formatNumberWithCommas(totalEarnedInterest), ' ',14)
						+ leftPadString(formatNumberWithCommas(totalEndingBalance), ' ',15))
				}

				//Print the summaryTable:
				document.getElementById("yearsToInvest").innerHTML = Math.round(totalYears).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				document.getElementById("totalEndingBalance").innerHTML = Math.round(totalEndingBalance).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				document.getElementById("totalEarnedSalary").innerHTML = Math.round(totalEarnedSalary).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				document.getElementById("totalSavings").innerHTML = Math.round(totalSavings).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				document.getElementById("totalEarnedInterest").innerHTML = Math.round(totalEarnedInterest).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			
				// Show the results table:
				summaryTable.style.visibility = "visible";
				detailedTable.style.visibility = "visible";

				// Disable related button:
				document.getElementById("makeMeRichButton").disabled = true;
				document.getElementById("makeMeRichButton").className = "button disabled";
				document.getElementById("defaultButton").disabled = true;
				document.getElementById("defaultButton").className = "button disabled";

			} else alert("Please make sure your starting age is less than your retirement age.");
		} // end of else		

	} // end of calculations


/*  function clearResultsTable(table)
 *  given a table, remove all rows except the heading
 *  table.rows returns a list of the rows.
 *  table.rows.length returns the number of rows
 *  If a table has 9 rows, row(0) is the header, row(8) is last
 *  deleteRow(index) from the last to all but the (0)
 */
function clearResultsTable(table) {

	for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(i-1);
	}
}
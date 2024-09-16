document.addEventListener("DOMContentLoaded", function () {
  //
  function clearAllFields() {
    document.getElementById("mortgage-amount").value = "";
    document.getElementById("mortgage-term").value = "";
    document.getElementById("interest-rate").value = "";
    document.querySelector('input[name="loan-type"]:checked').checked = false;

    // Clear the results displayed on the right side
    const rightSideDiv = document.querySelector(".right");
    rightSideDiv.innerHTML = `
        <img class="illustration-empty"
          src="C:\\Users\\HP\\Desktop\\project\\Images\\illustration-empty.svg"
          alt="Calculator" />
        <h2>Results shown here</h2>
        <h4>Complete the form and click "Calculate repayments" to see what your monthly repayments would be.</h4>`;
  }

  // Add event listener to the clear all
  document
    .querySelector(".align-text")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default link behavior (optional)

      clearAllFields();
    });

  // Add event listener to calculate repayments button
  document.querySelector(".repayments").addEventListener("click", function () {
    // Get input values
    const mortgageAmount = document.getElementById("mortgage-amount").value;
    const mortgageTerm = document.getElementById("mortgage-term").value;
    const interestRate = document.getElementById("interest-rate").value;
    const loanTypeElement = document.querySelector(
      'input[name="loan-type"]:checked'
    );
    const loanType = loanTypeElement ? loanTypeElement.value : null;

    // Validate inputs
    if (!mortgageAmount || !mortgageTerm || !interestRate || !loanType) {
      alert("Please fill in all fields.");
      return;
    }

    // calculations
    const principal = parseFloat(mortgageAmount);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const monthlyInterestRate = annualInterestRate / 12;
    const numberOfPayments = parseInt(mortgageTerm) * 12;

    let monthlyRepayment;
    if (loanType === "repayment") {
      monthlyRepayment =
        (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    } else if (loanType === "interest-only") {
      monthlyRepayment = principal * monthlyInterestRate;
    }
    const totalRepayment = monthlyRepayment * numberOfPayments;

    // Clear the right side div
    const rightSideDiv = document.querySelector(".right");
    rightSideDiv.innerHTML = "";

    // Create a div for additional text and heading
    const infoDiv = document.createElement("div");
    infoDiv.style.textAlign = "left";

    // Add heading
    const heading = document.createElement("h1");
    heading.textContent = "Your Results";
    heading.style.marginBottom = "10px"; // Adjust spacing as needed
    heading.style.color = "white";

    // Add introductory text
    const introText = document.createElement("p");
    introText.textContent =
      'Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.';
    introText.style.color = "white";

    // Append heading and text to the infoDiv
    infoDiv.appendChild(heading);
    infoDiv.appendChild(introText);

    // Create container div for results
    const resultsContainer = document.createElement("div");
    resultsContainer.style.backgroundColor = "#0E2433";
    resultsContainer.style.padding = "20px";
    resultsContainer.style.borderRadius = "10px";
    resultsContainer.style.textAlign = "left";
    resultsContainer.style.borderTop = "3px solid #ffc107"; // Yellow top border
    resultsContainer.style.width = "70%"; // Adjusted width

    // Add "Your monthly repayments" heading
    const monthlyHeading = document.createElement("h3");
    monthlyHeading.textContent = "Your monthly repayments";
    monthlyHeading.style.marginBottom = "10px"; // Adjust spacing as needed
    monthlyHeading.style.color = "rgb(223, 223, 223)";

    // Add monthly repayment amount
    const monthlyAmount = document.createElement("p");
    monthlyAmount.textContent = `£${monthlyRepayment.toFixed(2)}`;
    monthlyAmount.style.fontSize = "30px"; // Larger font size for main amount
    monthlyAmount.style.fontWeight = "bold";
    monthlyAmount.style.color = "rgb(210,217,77)";

    // Add horizontal line
    const hr = document.createElement("hr");
    hr.style.margin = "20px 0"; //

    // Add "Total you will pay over term" heading
    const totalHeading = document.createElement("h3");
    totalHeading.textContent = "Total you will pay over term";
    totalHeading.style.marginBottom = "10px";
    totalHeading.style.color = "rgb(223, 223, 223)";

    // Add total repayment amount
    const totalAmount = document.createElement("p");
    totalAmount.textContent = `£${totalRepayment.toFixed(2)}`;
    totalAmount.style.fontSize = "18px"; // Smaller font size for secondary amount
    totalAmount.style.fontWeight = "bold";
    totalAmount.style.color = "rgb(223, 223, 223)";

    // Append results container
    resultsContainer.appendChild(monthlyHeading);
    resultsContainer.appendChild(monthlyAmount);
    resultsContainer.appendChild(hr);
    resultsContainer.appendChild(totalHeading);
    resultsContainer.appendChild(totalAmount);

    // Append the infoDiv and resultsContainer to the right side div
    rightSideDiv.appendChild(infoDiv);
    rightSideDiv.appendChild(resultsContainer);
  });
});

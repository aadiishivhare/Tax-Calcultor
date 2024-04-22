$(document).ready(function() {
    $('#taxForm').submit(function(e) {
        e.preventDefault();
        var age = $('#age').val();
        var income = parseFloat($('#income').val());
        var extra_income = parseFloat($('#extra_income').val());
        var deductions = parseFloat($('#deductions').val() || 0);

        if (!age) {
            $('#age').addClass('is-invalid');
            return;
        } else {
            $('#age').removeClass('is-invalid');
        }

        if (isNaN(income)) {
            $('#income').addClass('is-invalid');
            return;
        } else {
            $('#income').removeClass('is-invalid');
        }
        if (isNaN(extra_income)) {
            $('#extra_income').addClass('is-invalid');
            return;
        } else {
            $('#extra_income').removeClass('is-invalid');
        }
        
        if (isNaN(deductions)) {
            $('#deductions').addClass('is-invalid');
            return;
        } else {
            $('#deductions').removeClass('is-invalid');
        }

        var taxableIncome = (income + extra_income )- deductions;
        var tax = calculateTax(taxableIncome, age);

        $('#taxModal').modal('show');
        $('#modalBody').html(`<p style="text-align:center">$${tax}</p><p style="text-align:center">after tax deductions. </p>`);
    });

    function calculateTax(income, age) {
        if (income <= 800000) {
            return income;
        }

        var taxRate = 0;
        if (age === 'under40') {
            taxRate = 0.3;
        } else if (age === '40to60') {
            taxRate = 0.4;
        } else if (age === 'over60') {
            taxRate = 0.1;
        }

        return (income - 800000) * taxRate;
    }

    
    
const fields = [
    { id: 'income', errorIconId: 'incomeErrorIcon', errorTooltipId: 'incomeErrorTooltip' },
    { id: 'deductions', errorIconId: 'deductionsErrorIcon', errorTooltipId: 'deductionsErrorTooltip' },
    { id: 'extra_income', errorIconId: 'extraErrorIcon', errorTooltipId: 'extraErrorTooltip'}
  ];
  
  fields.forEach(field => {
    const inputField = document.getElementById(field.id);
    const errorIcon = document.getElementById(field.errorIconId);
    const errorTooltip = document.getElementById(field.errorTooltipId);
  
    inputField.addEventListener('input', function() {
      const inputValue = this.value.trim();
  
      if (validateNumber(inputValue)) {
        errorIcon.classList.add('hidden');
        errorTooltip.classList.remove('visible');
      } else {
        errorIcon.classList.remove('hidden');
        errorTooltip.classList.add('visible');
      }
    });
  
    errorIcon.addEventListener('mouseenter', function() {
      const inputValue = inputField.value.trim();
  
      if (!validateNumber(inputValue)) {
        errorTooltip.textContent = 'Please enter numbers only';
        errorTooltip.classList.add('visible');
      }
    });
    
    errorIcon.addEventListener('mouseleave', function() {
      errorTooltip.classList.remove('visible');
    });
  });
  
  function validateNumber(input) {
    return !isNaN(input);
  }
});    
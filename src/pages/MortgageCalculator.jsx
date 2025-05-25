import React, { useState } from 'react';
import { FaPoundSign } from 'react-icons/fa';
import { AiOutlinePercentage } from 'react-icons/ai';
import { PiCalculatorFill } from 'react-icons/pi';

const MortgageCalculator = () => {
  const [notSubmitted, setNotSubmitted] = useState(true);
  const [formData, setFormData] = useState({
    mortgageAmount: '',
    mortgageTerm: '',
    interestRate: '',
    mortgageType: '',
  });
  const [errors, setErrors] = useState({
    mortgageAmount: '',
    mortgageTerm: '',
    interestRate: '',
    mortgageType: '',
  });
  const [monthlyRepayment, setMonthlyRepayment] = useState(null);
  const [totalRepayment, setTotalRepayment] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    setFormData((prev) => ({ ...prev, mortgageType: e.target.value }));
    setErrors((prev) => ({ ...prev, mortgageType: '' }));
  };

  // Calculate monthly and total repayment
  const calculateRepayments = () => {
    const principal = parseFloat(formData.mortgageAmount);
    const years = parseFloat(formData.mortgageTerm);
    const annualRate = parseFloat(formData.interestRate) / 100;
    const numberOfPayments = years * 12;

    let monthlyPayment = 0;
    let totalPayment = 0;

    if (formData.mortgageType === 'repayment') {
      const monthlyRate = annualRate / 12;
      monthlyPayment =
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      totalPayment = monthlyPayment * numberOfPayments;
    } else if (formData.mortgageType === 'interest-only') {
      monthlyPayment = principal * (annualRate / 12);
      totalPayment = monthlyPayment * numberOfPayments + principal;
    }

    return {
      monthly: monthlyPayment.toFixed(2),
      total: totalPayment.toFixed(2),
    };
  };

  // Handle form submission
  const handleSubmit = () => {
    let hasErrors = false;
    const newErrors = {
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: '',
    };

    if (!formData.mortgageAmount || isNaN(formData.mortgageAmount) || parseFloat(formData.mortgageAmount) <= 0) {
      newErrors.mortgageAmount = 'Please enter a valid mortgage amount';
      hasErrors = true;
    }
    if (!formData.mortgageTerm || isNaN(formData.mortgageTerm) || parseFloat(formData.mortgageTerm) <= 0) {
      newErrors.mortgageTerm = 'Please enter a valid mortgage term';
      hasErrors = true;
    }
    if (!formData.interestRate || isNaN(formData.interestRate) || parseFloat(formData.interestRate) <= 0) {
      newErrors.interestRate = 'Please enter a valid interest rate';
      hasErrors = true;
    }
    if (!formData.mortgageType) {
      newErrors.mortgageType = 'Please select a mortgage type';
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      setNotSubmitted(false);
      const { monthly, total } = calculateRepayments();
      setMonthlyRepayment(monthly);
      setTotalRepayment(total);
    }
  };

  // Handle Clear All
  const handleClear = () => {
    setFormData({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: '',
    });
    setErrors({
      mortgageAmount: '',
      mortgageTerm: '',
      interestRate: '',
      mortgageType: '',
    });
    setNotSubmitted(true);
    setMonthlyRepayment(null);
    setTotalRepayment(null);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-slate-100 px-4 sm:px-6 py-6 sm:py-8 font-jakarta">
      <div className="flex flex-col md:flex-row w-full max-w-[375px] md:max-w-[1440px] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side */}
        <div className="w-full md:w-1/2 flex flex-col justify-between p-4 sm:p-6 md:p-8 gap-4">
          {/* First div */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <span className="font-bold text-lg sm:text-xl md:text-2xl text-slate-700">Mortgage Calculator</span>
            <a className="underline decoration-solid cursor-pointer text-sm sm:text-base text-slate-500" onClick={handleClear}>
              Clear All
            </a>
          </div>
          {/* Second div */}
          <div>
  <label className="block text-base font-medium text-slate-500">
    Mortgage Amount
    <div className="relative mt-2">
      <input
        type="text"
        name="mortgageAmount"
        value={formData.mortgageAmount}
        onChange={handleInputChange}
        style={{ borderBottomLeftRadius: '0.5rem', borderTopLeftRadius: '0.5rem' }}
        className="pl-12 pr-4 py-2 w-full border border-slate-300 focus:border-slate-900 rounded-lg outline-none text-base font-medium text-slate-500"
        placeholder="Enter mortgage amount"
      />
      <div
        className="absolute inset-y-0 left-0 p-3 flex items-center pointer-events-none rounded-tl-lg rounded-bl-lg"
        style={{ 
          backgroundColor: errors.mortgageAmount ? 'hsl(4, 69%, 50%)' : 'hsl(61, 70%, 52%)', 
          color: errors.mortgageAmount ? 'white' : '#45514c' 
        }}
      >
        <FaPoundSign className="text-base" />
      </div>
    </div>
    {errors.mortgageAmount && (
      <p className="text-red text-xs sm:text-sm mt-1 font-medium">{errors.mortgageAmount}</p>
    )}
  </label>
</div>
          {/* Third div */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/2">
              <label className="block text-base font-medium text-slate-500">
                Mortgage Term
                <div className="relative mt-2">
  <input
    type="text"
    name="mortgageTerm"
    value={formData.mortgageTerm}
    onChange={handleInputChange}
    className="pl-2 pr-12 py-2 w-full border border-slate-300 focus:border-slate-900 rounded-lg outline-none text-base font-medium text-slate-500"
  />
  <div
    className="absolute inset-y-0 right-0 p-3 flex items-center pointer-events-none rounded-tr-lg rounded-br-lg"
    style={{ 
      backgroundColor: errors.mortgageTerm ? 'hsl(4, 69%, 50%)' : 'hsl(202, 86%, 94%)', 
      color: errors.mortgageTerm ? 'white' : '#45514c' 
    }}
  >
    <span 
      className="text-base font-medium text-slate-500" 
      style={{ color: 'inherit' }}
    >
      years
    </span>
  </div>
</div>
                {errors.mortgageTerm && (
                  <p className="text-red text-xs sm:text-sm mt-1 font-medium">{errors.mortgageTerm}</p>
                )}
              </label>
            </div>
            <div className="w-full md:w-1/2">
  <label className="block text-base font-medium text-slate-500">
    Interest Rate
    <div className="relative mt-2">
      <div
        className="absolute inset-y-0 right-0 p-3 flex items-center pointer-events-none rounded-tr-lg rounded-br-lg"
        style={{ 
          backgroundColor: errors.interestRate ? 'hsl(4, 69%, 50%)' : 'hsl(202, 86%, 94%)', 
          color: errors.interestRate ? 'white' : '#45514c' 
        }}
      >
        <AiOutlinePercentage className="text-base" />
      </div>
      <input
        type="text"
        name="interestRate"
        value={formData.interestRate}
        onChange={handleInputChange}
        className="pl-2 pr-12 py-2 w-full border border-slate-300 focus:border-slate-900 rounded-lg outline-none text-base font-medium text-slate-500"
      />
    </div>
    {errors.interestRate && (
      <p className="text-red text-xs sm:text-sm mt-1 font-medium">{errors.interestRate}</p>
    )}
  </label>
</div>
          </div>
          {/* Fourth div */}
          <div className="flex flex-col gap-2">
            <p className="text-base font-medium text-slate-500">Mortgage Type</p>
            <div className="px-4 py-2 bg-[#fafae2] border rounded-lg border-slate-300">
              <label className="flex items-center text-base font-medium text-slate-500">
                <input
                  type="radio"
                  name="mortgageType"
                  value="repayment"
                  checked={formData.mortgageType === 'repayment'}
                  onChange={handleRadioChange}
                  className="radio  mr-2"
                  style={{ accentColor: '#d1d846', borderColor: '#d1d846' }}
                />
                Repayment
              </label>
            </div>
            <div className="px-4 py-2 bg-[#fafae2] border rounded-lg border-slate-300">
              <label className="flex items-center text-base font-medium text-slate-500">
                <input
                  type="radio"
                  name="mortgageType"
                  value="interest-only"
                  checked={formData.mortgageType === 'interest-only'}
                  onChange={handleRadioChange}
                  className="mr-2"
                  style={{ accentColor: '#d1d846', borderColor: '#d1d846' }}
                />
                Interest Only
              </label>
            </div>
            {errors.mortgageType && (
              <p className="text-red text-xs sm:text-sm mt-1 font-medium">{errors.mortgageType}</p>
            )}
          </div>
          {/* Fifth div */}
          <div className="flex justify-center mt-4">
            <button
              className="bg-[#d5da45] text-slate-700 font-bold flex gap-2 items-center px-4 py-2 rounded-lg border-lime text-base"
              onClick={handleSubmit}
            >
              <PiCalculatorFill className="text-slate-700 text-lg sm:text-xl" />
              Calculate Repayments
            </button>
          </div>
        </div>
        {/* Right side */}
        <div
          className="w-full md:w-1/2 bg-[#133040] md:rounded-bl-[50px] md:rounded-tr-lg md:rounded-br-lg p-4 sm:p-6 md:p-8 flex flex-col justify-center"
          style={{ borderBottomLeftRadius: '50px' }}
        >
          {notSubmitted ? (
            <div className="flex flex-col justify-center items-center gap-4 text-center py-6 sm:py-8">
              <img className="w-40 sm:w-48 md:w-60" src="/calculator.png" alt="Calculator" />
              <p className="font-bold text-lg sm:text-xl md:text-2xl text-white">Results Shown Here</p>
              <p className="text-slate-300 text-sm sm:text-base">
                Complete the form and click "Calculate Repayments" to see what your monthly repayments would be.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-6 sm:py-8">
              <p className="font-bold text-lg sm:text-xl md:text-2xl text-white text-left">Your Results</p>
              <p className="text-slate-400 text-sm sm:text-base text-left">
                Your results are shown below based on the information you provided. To adjust results, edit the form and click "Calculate Repayments" again.
              </p>
              <div className="w-full rounded-xl bg-[#0e2431] border-t-4 border-[#d5da45] px-4 sm:px-6 py-6 sm:py-8">
                <p className="text-slate-400 text-sm sm:text-base text-left">Your monthly repayments</p>
                <p className="text-3xl sm:text-4xl md:text-5xl text-[#d5da45] font-bold text-left">
                  £{monthlyRepayment}
                </p>
                <hr className="border-slate-300 my-4 sm:my-6 w-[90%] mx-auto" />
                <p className="text-slate-400 text-sm sm:text-base text-left">Total you'll repay over the term</p>
                <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold text-left">
                  £{totalRepayment}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
let billInput = $("#input-bill");
let peopleInput = $("#input-people");
let displayTip = $("#display-tip-amt");
let displayTotal = $("#display-total-amt");
let tipInputs = $(".tip-input");
let custom = $("#custom");
let reset = $("#reset");
let tipAmount = 0;
let billAmount = 0;
let noOfPeople = 1;

$("#input-bill").focusout(() => {
  billAmount = Number($("#input-bill").val());
  $("#input-bill").val(billAmount.toFixed(2));
  calculate();
});

for (let i = 0; i < tipInputs.length; i++) {
  $(tipInputs[i]).click(() => {
    toggleTipBtns();
    $("#custom").val("");
    $(tipInputs[i]).addClass("clicked");
    tipAmount = Number($(tipInputs[i]).attr("value"));
    calculate();
  });
}

$("#custom").focusout(() => {
  toggleTipBtns();
  tipAmount = Number($("#custom").val());
  calculate();
});

$("#input-people")
  .focusout(() => {
    let peopleValue = Number($("#input-people").val());
    if (peopleValue === 0) {
      $("#error-msg").css("visibility", "visible");
      $("#input-people").addClass("error");
    } 
    else {
      noOfPeople = peopleValue;
      calculate();
    }
  });
  
  $("#reset").click(() => {
  $("#input-bill").val("0.00");
  toggleTipBtns();
  $("#custom").val("");
  $("#input-people").val("1");
  tipAmount = 0;
  billAmount = 0;
  noOfPeople = 1;
  calculate();
});

 const calculate = () => {
  let tipPerPerson = Number((billAmount * (tipAmount / 100)) / noOfPeople);
  let totalPerPerson = Number(billAmount / noOfPeople + tipPerPerson);
  displayTip.text("$" + tipPerPerson.toFixed(2));
  displayTotal.text("$" + totalPerPerson.toFixed(2));
};

const toggleTipBtns = () => {
  for (let i = 0; i < tipInputs.length; i++) {
    if ($(tipInputs[i]).hasClass("clicked")) {
      $(tipInputs[i]).removeClass("clicked");
    }
  }
};
$("#input-people").attr({
  "max" : "",
  "min" : 0
});
 
$("#custom").attr({
  "max" : 100,
  "min" : 0
  })

 $("#custom").on('keyup keydown change', function(e){
    console.log($(this).val() > 100)
        if ($(this).val() > 100 
            && e.keyCode !== 46
            && e.keyCode !== 8
           ) {
           e.preventDefault();     
           $(this).val(100);
        }
    });







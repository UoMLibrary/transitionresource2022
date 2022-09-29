function updateTextArea() {
  var allVals = [];
  const checkboxes = document.querySelectorAll(
    ".custom-checkbox__input:checked"
  );
  allVals.push(...checkboxes);
  allVals = allVals.map((el) => {
    return el.defaultValue;
  });
  if(window.localStorage) {
    localStorage.setItem('checkedIds',[...checkboxes].map(checkbox=>checkbox.id).join(','))
  }
  let makeList = document.querySelector("#sideArea");
  let copyList =
    "<ol>" +
    allVals
      .map((element) => {
        return "<li>" + element + "</li>";
      })
      .join("") +
    "</ol>";
  makeList.innerHTML = copyList;
  navigator.clipboard.writeText(copyList);
  let emailList =
    "%0a" +
    allVals
      .map((element) => {
        return "%09" + "* " + element;
      })
      .join("%0a");
  //add link to page
  //for each line link + element +
  let resourceLink = "http://www.manchester.ac.uk";
  document.getElementById("emailMe").onclick = () => {
    location.href = `mailto:?body=${emailList}` + "%0a" + resourceLink;
  };
}

document.querySelectorAll(".contentList input").forEach((element) => {
  element.onclick = updateTextArea;
});

document.querySelectorAll(".sticky-sharebar__btn").forEach((element) => {
  element.onclick = gtag('event','todoOpened');
});

var button = document.getElementById("copyID"),
  input = document.getElementById("toDoLater");
button.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.clipboard.writeText(input.value);
});
(function(){
  if(window.localStorage && localStorage.getItem('checkedIds')) {
    let checkedIds = localStorage.getItem('checkedIds').split(',').filter(checkedId=>checkedId.match(/^[a-z0-9][-a-z0-9]*$/i))
    checkedIds.forEach(checkedId=>{
      document.getElementById(checkedId).checked=true
    })
  }
 updateTextArea();
})()

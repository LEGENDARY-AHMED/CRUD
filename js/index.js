const BookmarkNameInput = document.getElementById("BookmarkName");
const WebsiteURLInput = document.getElementById("WebsiteURL");
let BookmarkContainer;

if (localStorage.getItem("BookmarkContainer") == null) {
  BookmarkContainer = [];
} else {
  BookmarkContainer = JSON.parse(localStorage.getItem("BookmarkContainer"));
  displayBookmarks();
}

function addBookmark() {
  let Bookmark = {
    name: BookmarkNameInput.value,
    url: WebsiteURLInput.value,
  };
  if (AllRegex(Bookmark) === true) {
    BookmarkContainer.push(Bookmark);
    displayBookmarks();
    localStorage.setItem(
      "BookmarkContainer",
      JSON.stringify(BookmarkContainer)
    );
    clearBookmark();
  } else {
    alert(
      "Invalid input. Bookmark name must be alphanumeric and start with a Lowercase letter..."
    );
  }
}

function clearBookmark() {
  BookmarkNameInput.value = "";
  WebsiteURLInput.value = "";
}

function clearAll() {
  localStorage.clear();
  BookmarkContainer = [];
  displayBookmarks();
}

function displayBookmarks() {
  let cartona = "";
  for (let index = 0; index < BookmarkContainer.length; index++) {
    cartona += `<div class="col-md-3 col-sm-6">
                <div class="prodact">
                  
                    <div class="card">
                    <a href="${BookmarkContainer[index].url}" class="text-decoration-none link-light">
                      <div class="card-body">
                        <h5 class="card-title text-center">
                        ${BookmarkContainer[index].name}
                        </h5>
                      </div>
                       </a>
                      <div class="card-footer mx-auto">
                       <button onclick="removeBookmark(${index})" class="btn btn-danger mx-auto">Remove</button>
                        </div>
                    </div>
                 
                </div>
              </div>`;
  }
  document.getElementById("bookmarksList").innerHTML = cartona;
}

function removeBookmark(index) {
  BookmarkContainer.splice(index, 1);
  localStorage.setItem("BookmarkContainer", JSON.stringify(BookmarkContainer));
  displayBookmarks();
}

// function editBookmark(index) {
//   BookmarkNameInput.value = BookmarkContainer[index].name;
//   WebsiteURLInput.value = BookmarkContainer[index].url;
// }
function AllRegex(Bookmark) {
  let regex = {
    BookmarkName: /^[A-Z]+[a-z]*[1-9]*$/,
    WebsiteURL:
      /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/,
  };
  if (
    regex.BookmarkName.test(Bookmark.name) &&
    regex.WebsiteURL.test(Bookmark.url)
  ) {
    return true;
  } else {
    return false;
  }
}
function searchByName(serch) {
  let cartona = "";
  for (let index = 0; index < BookmarkContainer.length; index++) {
    if (
      BookmarkContainer[index].name.toLowerCase().includes(serch.toLowerCase())
    ) {
      cartona += `<div class="col-md-3 col-sm-6">
                <div class="prodact">
                  
                    <div class="card">
                    <a href="${BookmarkContainer[index].url}" class="text-decoration-none link-light">
                      <div class="card-body">
                        <h5 class="card-title text-center">
                        ${BookmarkContainer[index].name}
                        </h5>
                      </div>
                       </a>
                      <div class="card-footer mx-auto">
                       <button onclick="removeBookmark(${index})" class="btn btn-danger mx-auto">Remove</button>
                        </div>
                    </div>
                 
                </div>
              </div>`;
    }
    document.getElementById("bookmarksList").innerHTML = cartona;
  }
}

$(".btn-nav").click(function () {
  if ($(this).hasClass("show")) {
    $("#add").hide(1000, function () {
      $("#show").show(1000);
    });
    $(this).removeClass("button-78");
    $(this).addClass("button-77");
    $(".add").removeClass("button-77");
    $(".add").addClass("button-78");
  } else if ($(this).hasClass("add")) {
    $("#show").hide(1000, function () {
      $("#add").show(1000);
    });
    $(this).removeClass("button-78");
    $(this).addClass("button-77");
    $(".show").removeClass("button-77");
    $(".show").addClass("button-78");
  }
});

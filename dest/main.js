"use strict";

$(function () {
  var $description = $(".description");
  var $descriptionBtn = $(".description__container__btn");
  var $welcome = $(".welcome");
  var $afterGame = $(".afterGame");
  var $afterGameBtn = $(".afterGame__container__btn");
  var winnerKnown = false;
  var circleSource = "dest/images/circleSmall.png";
  var crossSource = "dest/images/x-crossSmall.png";

  function nextSection(showElem, time, hideElem) {
    var changeActive = setTimeout(function () {
      showElem.addClass("active");
      hideElem.removeClass("active");
    }, time);
    return changeActive;
  }

  function npcMove(src, npcSign) {
    if (winnerKnown) {
      return;
    }

    var $uncheckedCells = $(".playing__container__table__row__cell").not(".checked");
    var npcChoice = $uncheckedCells.eq(Math.floor(Math.random() * $uncheckedCells.length));
    npcChoice.children(".playing__container__table__row__cell__img").attr("src", src).addClass("show");
    npcChoice.addClass("checked ".concat(npcSign));
    checkComputerWin(npcSign);
  }

  function checkPlayerWin(playerSign) {
    if ($tableCells.eq(0).hasClass("".concat(playerSign)) && $tableCells.eq(3).hasClass("".concat(playerSign)) && $tableCells.eq(6).hasClass("".concat(playerSign)) || $tableCells.eq(1).hasClass("".concat(playerSign)) && $tableCells.eq(4).hasClass("".concat(playerSign)) && $tableCells.eq(7).hasClass("".concat(playerSign)) || $tableCells.eq(2).hasClass("".concat(playerSign)) && $tableCells.eq(5).hasClass("".concat(playerSign)) && $tableCells.eq(8).hasClass("".concat(playerSign)) || $tableCells.eq(0).hasClass("".concat(playerSign)) && $tableCells.eq(4).hasClass("".concat(playerSign)) && $tableCells.eq(8).hasClass("".concat(playerSign)) || $tableCells.eq(2).hasClass("".concat(playerSign)) && $tableCells.eq(4).hasClass("".concat(playerSign)) && $tableCells.eq(6).hasClass("".concat(playerSign)) || $tableCells.eq(0).hasClass("".concat(playerSign)) && $tableCells.eq(1).hasClass("".concat(playerSign)) && $tableCells.eq(2).hasClass("".concat(playerSign)) || $tableCells.eq(3).hasClass("".concat(playerSign)) && $tableCells.eq(4).hasClass("".concat(playerSign)) && $tableCells.eq(5).hasClass("".concat(playerSign)) || $tableCells.eq(6).hasClass("".concat(playerSign)) && $tableCells.eq(7).hasClass("".concat(playerSign)) && $tableCells.eq(8).hasClass("".concat(playerSign))) {
      endGame("You");
    }
  }

  function checkComputerWin(npcSign) {
    if ($tableCells.eq(0).hasClass("".concat(npcSign)) && $tableCells.eq(3).hasClass("".concat(npcSign)) && $tableCells.eq(6).hasClass("".concat(npcSign)) || $tableCells.eq(1).hasClass("".concat(npcSign)) && $tableCells.eq(4).hasClass("".concat(npcSign)) && $tableCells.eq(7).hasClass("".concat(npcSign)) || $tableCells.eq(2).hasClass("".concat(npcSign)) && $tableCells.eq(5).hasClass("".concat(npcSign)) && $tableCells.eq(8).hasClass("".concat(npcSign)) || $tableCells.eq(0).hasClass("".concat(npcSign)) && $tableCells.eq(4).hasClass("".concat(npcSign)) && $tableCells.eq(8).hasClass("".concat(npcSign)) || $tableCells.eq(2).hasClass("".concat(npcSign)) && $tableCells.eq(4).hasClass("".concat(npcSign)) && $tableCells.eq(6).hasClass("".concat(npcSign)) || $tableCells.eq(0).hasClass("".concat(npcSign)) && $tableCells.eq(1).hasClass("".concat(npcSign)) && $tableCells.eq(2).hasClass("".concat(npcSign)) || $tableCells.eq(3).hasClass("".concat(npcSign)) && $tableCells.eq(4).hasClass("".concat(npcSign)) && $tableCells.eq(5).hasClass("".concat(npcSign)) || $tableCells.eq(6).hasClass("".concat(npcSign)) && $tableCells.eq(7).hasClass("".concat(npcSign)) && $tableCells.eq(8).hasClass("".concat(npcSign))) {
      endGame("PC");
    }
  }

  function endGame(winner) {
    winnerKnown = true;
    var $checkedPools = $(".checked");
    $checkedPools.each(function () {
      if ($(this).hasClass("circle")) {
        $(this).removeClass("checked circle");
      } else {
        $(this).removeClass("checked x-cross");
      }

      $(this).children(".playing__container__table__row__cell__img").attr("src", "").removeClass("show");
      $(".afterGame__container__headline").text("".concat(winner, " won"));
      $afterGame.fadeIn("slow");
    });
  }

  nextSection($welcome, 5000);
  setTimeout(function () {
    $description.show();
  }, 5000);
  var $welcomeBtn = $("#welcomeBtn");
  var $signChoose = $(".signChoose");
  var $playing = $(".playing");
  $descriptionBtn.on("click", function () {
    var descriptionContent = $(".description__container__content");
    descriptionContent.toggleClass("hide");
  });
  $welcomeBtn.on("click", function () {
    nextSection($signChoose, 1, $welcome);
  });
  var playerSign = "";
  var $signs = $(".signChoose__container__boxSigns__btn");
  $signs.on("click", function () {
    if ($(this).hasClass("signChoose__container__boxSigns__btn--circle")) {
      playerSign = "circle";
    } else {
      playerSign = "cross";
    }

    $signChoose.hide();
    $playing.show();

    if (playerSign === "cross") {
      npcMove(circleSource, "circle");
    }
  });
  var $tableCells = $(".playing__container__table__row__cell");
  $tableCells.each(function () {
    $(this).on("click", function () {
      if (winnerKnown) {
        winnerKnown = false;
      }

      if ($(this).children(".playing__container__table__row__cell__img").attr("src") === "") {
        if (playerSign === "circle") {
          $(this).children(".playing__container__table__row__cell__img").attr("src", circleSource).addClass("show");
          $(this).addClass("checked circle");
          checkPlayerWin("circle");
          npcMove(crossSource, "x-cross");
        } else {
          $(this).children(".playing__container__table__row__cell__img").attr("src", crossSource).addClass("show");
          $(this).addClass("checked x-cross");
          checkPlayerWin("x-cross");
          npcMove(circleSource, "circle");
        }
      }

      if ($(".playing__container__table__row__cell").not(".checked").length === 0) {
        endGame("Draw, nobody");
      }

      ;
    });
  });
  $afterGameBtn.on("click", function () {
    $afterGame.fadeOut("slow");
  });
});
//# sourceMappingURL=main.js.map

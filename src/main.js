$(function () {
    const $title = $("#header");
    const $welcome = $(".welcome");
    const $afterGame = $(".afterGame");
    const $afterGameBtn = $(".afterGame__container__btn");

    let winnerKnown = false;
    const circleSource = "dest/images/circleSmall.png";
    const crossSource = "dest/images/x-crossSmall.png";

    function nextSection (hideElem, showElem, time) {
        const changeActive = setTimeout(() => {
            hideElem.removeClass("active");
            showElem.addClass("active");
        }, time);
        return changeActive;
    }

    function npcMove (src, npcSign) {
        if (winnerKnown) {
            return;
        }
        const $uncheckedCells = $(".playing__container__table__row__cell").not(".checked");
        const npcChoice = $uncheckedCells.eq(Math.floor(Math.random() * $uncheckedCells.length));
        npcChoice.children(".playing__container__table__row__cell__img").attr("src", src).addClass("show");
        npcChoice.addClass(`checked ${npcSign}`);
        checkComputerWin(npcSign);
    }

    function checkPlayerWin (playerSign) {
        if (($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(3).hasClass(`${playerSign}`) && $tableCells.eq(6).hasClass(`${playerSign}`)) || ($tableCells.eq(1).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(7).hasClass(`${playerSign}`)) || ($tableCells.eq(2).hasClass(`${playerSign}`) && $tableCells.eq(5).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`)) || ($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`)) || ($tableCells.eq(2).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(6).hasClass(`${playerSign}`)) || ($tableCells.eq(0).hasClass(`${playerSign}`) && $tableCells.eq(1).hasClass(`${playerSign}`) && $tableCells.eq(2).hasClass(`${playerSign}`)) || ($tableCells.eq(3).hasClass(`${playerSign}`) && $tableCells.eq(4).hasClass(`${playerSign}`) && $tableCells.eq(5).hasClass(`${playerSign}`)) || ($tableCells.eq(6).hasClass(`${playerSign}`) && $tableCells.eq(7).hasClass(`${playerSign}`) && $tableCells.eq(8).hasClass(`${playerSign}`))) {
            endGame();
        }
    }

    function checkComputerWin (npcSign) {
        if (($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(3).hasClass(`${npcSign}`) && $tableCells.eq(6).hasClass(`${npcSign}`)) || ($tableCells.eq(1).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(7).hasClass(`${npcSign}`)) || ($tableCells.eq(2).hasClass(`${npcSign}`) && $tableCells.eq(5).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`)) || ($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`)) || ($tableCells.eq(2).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(6).hasClass(`${npcSign}`)) || ($tableCells.eq(0).hasClass(`${npcSign}`) && $tableCells.eq(1).hasClass(`${npcSign}`) && $tableCells.eq(2).hasClass(`${npcSign}`)) || ($tableCells.eq(3).hasClass(`${npcSign}`) && $tableCells.eq(4).hasClass(`${npcSign}`) && $tableCells.eq(5).hasClass(`${npcSign}`)) || ($tableCells.eq(6).hasClass(`${npcSign}`) && $tableCells.eq(7).hasClass(`${npcSign}`) && $tableCells.eq(8).hasClass(`${npcSign}`))) {
            endGame();
        }
    }

    function endGame () {
        winnerKnown = true;
        const $checkedPools = $(".checked");
        $checkedPools.each(function () {
            if ($(this).hasClass("circle")) {
                $(this).removeClass("checked circle");
            } else {
                $(this).removeClass("checked x-cross");
            }
            $(this).children(".playing__container__table__row__cell__img").attr("src", "").removeClass("show");
            $afterGame.show();
        })
    }

    nextSection($title, $welcome, 800);

    const $welcomeBtn = $("#welcomeBtn");
    const $signChoose = $(".signChoose");
    const $playing = $(".playing");

    $welcomeBtn.on("click", () => {
        nextSection($welcome, $signChoose, 1);
    });

    let playerSign = "";

    const $signs = $(".signChoose__container__boxSigns__btn");
    
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

    const $tableCells = $(".playing__container__table__row__cell");

    $tableCells.each(function () {
        $(this).on("click", function () {
            if (winnerKnown) {
                winnerKnown = false;
            }
            if ( $(this).children(".playing__container__table__row__cell__img").attr("src") === "") {
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
        })
    });
    $afterGameBtn.on("click", () => {
        $afterGame.hide();
    })
});
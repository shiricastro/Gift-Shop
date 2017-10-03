$('.login-page').on('click',function(){
	$(this).css({display:'none'});
	$('.main-container').css({display:'block'});
});

var dataVal = {
	entry:{content:`<h1>מבוא</h1>
		   <p class="text-container">ברוכים הבאים לחנות המתנות,</br> כאן תלמד כיצד לקנות מתנות שוות.</p>`,
		   index:`1`},
	selectGift:{content:`<h1>איך לבחור מתנה</h1>
			<p class="text-container">בחר מתנה שעולה הרבה כסף!</p>	
			<div class="gift-container">
				<button><img src="image/mac.png" alt="image" /></button>
				<button><img src="image/macAir.png" alt="image"/></button>
				<button><img src="image/iphone.jpeg" alt="image"/></button>
			</div>`,
			index:`2`},
	summary:{content:`<div class="summery-container">
				<div class="summery-wrap">
					<h1>סיכום</h1>
					<p class="text-container">תודה שהשתתפת בחנות המתנות! </br> עכשיו אתה מוכן לקנות מתנות שוות.</p>
				</div>	
				<img class="summary-img" src="" alt="image"/>
			</div>`,
			index:`3`}
}

var container = $('.container');
var pageNumber = $('.page-number');
var dataSize = Object.keys(dataVal).length;
var selectGift = 'image/GiftBox.png';

addContainer('entry');

$('.nav-button').on('click',(e) => {
	addContainer($(e.target).attr('data-name'));
	navActive($(e.target));
});
$('.pages-botton').on('click',(e) => findDataName($(e.target).attr('next-index')));

function selectImg(){
	$('.gift-container button').on('click',(e) => {
		selectGift = $(e.target).attr('src');
	});	
}

function addContainer(dataName){
	var data = dataVal[dataName];
	$(container).html(data.content);
	$(pageNumber).html(`${dataSize} / ${data.index}`);
	pagesNumber(data.index);
}

function findDataName(ind){
	var dataName = jQuery.map(dataVal, function(obj,key) {
	    if(obj.index === ind)
	         return key; 
	})[0];
	addContainer(dataName);
	navActive($(`.nav-button[data-name=${dataName}]`)[0]);
}

function navActive(element){
	$('.nav-button').removeClass('activ-Button');
	$(element).addClass('activ-Button');
}

function pagesNumber(index){
	var previousBtn = $('.previous-page');
	var nextBtn = $('.next-page');
	var previousNum = Number(index)-1;
	var nextNum = Number(index)+1;

	$('.pages-botton').attr("disabled",false).removeClass("disabeldBtn");
	$(previousBtn).attr('next-index',previousNum);
	$(nextBtn).attr('next-index',nextNum);	
	if(previousNum === 0 ){
		$(previousBtn).attr("disabled",true).addClass("disabeldBtn");
	}else if(nextNum === 3){
		selectImg();
	}else if(nextNum > dataSize){
		$($('.summary-img')[0]).attr('src',selectGift);	
		$(nextBtn).attr("disabled",true).addClass("disabeldBtn");
	}
}


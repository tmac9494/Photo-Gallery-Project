$(document).ready(function(){
	// global variables
var $shadow = $('.light-box');
var $picLink;
var $picDescription;
var $gallery = $('.gallery');

function findArrowShift() {
	//get right arrow next pic
	$shiftRight = $bigPicSelect.nextAll('.gallery-img').not('.hidden').first();
	//get left arrow next pic
	$shiftLeft = $bigPicSelect.prevAll('.gallery-img').not('.hidden').first();
		//get to children (a)
		$rightL = $shiftRight.children();
		$leftL = $shiftLeft.children();
		//get left picture from a href value
		$leftLink = $leftL.attr('href');
		//get right picture from a href value
		$rightLink = $rightL.attr('href');
		//get to child of a (img)
		$toChildR = $rightL.children(); 
		$toChildL = $leftL.children();
		//get right arrow description
		$rightDescription =  $toChildR.attr('alt');
		//get left arrow description
		$leftDescription = $toChildL.attr('alt');
}

function setLeft() {
	//set left arrow img src
	$NewLink = $leftLink;
	//set left arrow description
	$description = $leftDescription;
	//make change and get new values
}
function setRight() {
	//set right arrow img src
	$NewLink = $rightLink;
	//set right arrow description
	$description = $rightDescription;
	//make change and get new value	
}

function close() {
	$('.big-pic-wrap').fadeOut(200, function() {
			$(this).remove();
		});
	$shadow.fadeOut(200);
}

function picVidCheck() {
//if video show or hide elements
	if ($bigPicSelect.hasClass('gallery-video')) {
		$('.big-pic-wrap .big-pic').hide();
		$('.big-pic-wrap iframe').show();

	} else if(!$bigPicSelect.hasClass('gallery-video')) {
		$('.big-pic-wrap img').show();
		$('.big-pic-wrap iframe').hide();
	}

}

function getPosition() {
	//reset arrow values after clicking an arrow
		//get current light-box img src
		//if video, get values
		if ($bigPicSelect.hasClass('gallery-video')) {
		$picPositionAfterLink = $('.big-pic-wrap iframe').attr('src');
		} else {
		$picPositionAfterLink = $('.big-pic-wrap img').attr('src');
		}

		//find image link location after slide change using src from^^^
		$picPositionAfter = $gallery.find('a[href="' + $picPositionAfterLink +'"]');

		//get to parent to traverse
		$bigPicSelect = $picPositionAfter.parent();

		picVidCheck();
		findArrowShift();
}

//function to call the change to the lightbox
function changeBigPic() {
//fade lightbox image and text out before src and description change
	
	if ($bigPicSelect.hasClass('gallery-video')) {

	$('iframe, .pic-description').fadeOut(200, function() {
		//make changes after choosing direction
		$('.big-pic-wrap .pic-description').html($description);
		$('.big-pic-wrap img').attr('src', $NewLink);
		$('.big-pic-wrap iframe').attr('src', $NewLink);

	//fade in lightbox image and text after src and description change
		$('iframe, .pic-description').fadeIn(200, function() {

			getPosition();

		});

	});
	} else {

	$('.big-pic, .pic-description').fadeOut(200, function() {
		//make changes after choosing direction
		$('.big-pic-wrap .pic-description').html($description);
		$('.big-pic-wrap img').attr('src', $NewLink);
		$('.big-pic-wrap iframe').attr('src', $NewLink);

	//fade in lightbox image and text after src and description change
		$('.big-pic, .pic-description').fadeIn(200, function() {

	//reset arrow values after clicking an arrow
		//get current light-box img src
		//if video, get values
			getPosition();

		});

	});
}
}

function checkForEnd() {
		//dont show description if at beginning or end of img list
		if (! $rightDescription) {
			$rightDescription = $('.big-pic-wrap .pic-description').text();
		} else if (! $leftDescription) {
			$leftDescription = $('.big-pic-wrap .pic-description').text();
		}
}

//gallery light box

$('.gallery-img a').click(function(e) {
		e.preventDefault();
		//get pic and description
		$picDescription = $(this).children(['img']).attr('alt');
		$picLink = $(this).attr('href');
		//find the next image containers for arrows
		$bigPicSelect = $(this).parent();

		findArrowShift();

		$shadow.append('<div class="big-pic-wrap"><img src="'+ $picLink +'" class="big-pic"> <iframe width="560" height="315" src="'+ $picLink +'" frameborder="0" allowfullscreen></iframe> <p class="pic-description">'+ $picDescription +'</p></div>');
		
		picVidCheck();
		//show background
		$shadow.fadeIn(200);

		//dont-show description if at beggining or end of img list
		checkForEnd();

});

// arrow key navigation for light-box

$(document).keydown(function(e){
    if (e.keyCode === 37) {
    	setLeft();
    checkForEnd();
    changeBigPic();
    } else if (e.keyCode === 39) {
		setRight();
    checkForEnd();
    changeBigPic();
    } else if (e.keyCode === 27) {
   		close();
    }
});

//arrow click navigation for lightbox

$('.arrows').click(function(e) {
		e.preventDefault();
		// arrow right effect
		if($(this).hasClass('shift-right')) {
			setRight();
		// arrow left effect
		} else if($(this).hasClass('shift-left')) {
			setLeft();
		}

		checkForEnd();
		//make change and get new values	
		changeBigPic();
});

//exit button
	$('.close').click(function(e) {
		e.preventDefault();
		close();
	});		

//Search Box
	//remove images that do not contain text inside the searchbox in their alt tags
	$('#search').keyup(function() {
		//get text from search box on key-up
		$searchString = $('#search').val();
		//find images that do not contain matiching alt values
		$noMatch = $gallery.find('.gallery-img a img:not([alt*="' + $searchString + '"])');
		//find images that do contain matiching alt values
		$yesMatch = $gallery.find('.gallery-img a img[alt*="' + $searchString + '"]');
		//get to div.gallery-img
		$trash = $noMatch.parent().parent();
		$keep = $yesMatch.parent().parent();
		
		//use .hidden to hide detached elements
		$trash.each(function() {
			if ($(this).hasClass('hidden')) {
				//do nothing
			} else {
				//add class to trash divs
				$(this).fadeOut(function() {
					$(this).addClass('hidden');
				});
			}
		});
		
		//remove .hidden for keep elements
		$keep.each(function() {
			if ($(this).hasClass('hidden')) {
				//remove .hiddden from good divs
				$(this).fadeIn(function() {
					$(this).removeClass('hidden');
				});
			}
		});

		//if field is empty show all(remove all .hidden classes)
		if (! $searchString) {
			$trash.each(function() {
				$(this).fadeIn(function() {
				$(this).removeClass('hidden');
				});
			});
		}
	});

// add play icons to videos
 $('.gallery-video').append('<div class="play-icon"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>');

});

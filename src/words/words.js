ua.directive('uaWords',function(){
	function parseWords(string){
		return string.split('|||');
	}

	function wordToLetter(word){
		var letters = '';
		for(var ii=0;ii<word.length; ii++){
			letters += '<i><em>'+ word[ii] +'</em></i>';
		}
		return letters;
	}

	var letterAnimThemes = ['letter-rotatex','letter-rotatey','letter-scale','letter-roll','letter-type'];

	return {
		restric:'E',
		template:function(elem,attr){
			var theme = attr.uaTheme ||'rotate';
			var words = attr.words || 'no|||words|||specified';

			words = parseWords(words);
			// build up template
			var tpl = '<span class="uac-words">';   
			if( letterAnimThemes.indexOf(theme) > -1 ){
				for(var ii=0;ii<words.length ; ii++){
					tpl+= '<b '+ ( ii==0 ? 'class="uac-visible"':'')+'>'+wordToLetter( words[ii].trim() ) + '</b>';
				}

			}else{
				for(var ii=0;ii<words.length ; ii++){
					tpl+= '<b '+ ( ii==0 ? 'class="uac-visible"':'')+'>'+ words[ii].trim() + '</b>';
				}
			}
			tpl += '</span>';

			return tpl;
		},
		replace:true,
		// scope:{},
		link:function($scope,elm,attr,ctrl){
			var _duration = parseInt(attr.uaDuration,10) || 2500;
			var animationDuration = 1200;// in and out duration;
			var letterAnimDelay = 80;

			var _letterDuration = 800;

			var theme = attr.uaTheme ||'rotate';
			 elm.addClass(( theme.indexOf('letter')>-1?'uac-':'uac-words-')+theme );

			var $words = elm.find('b');

			var wordAnimatorTimeout;

			var activeWordIndex=0,$current = $words[0],$previous, $next;
			function wordAnimator(){
				if(activeWordIndex >= $words.length ) activeWordIndex = 0;
				$current = getByIndex($words, activeWordIndex );
				$previous = getByIndex($words, activeWordIndex - 1 );
				$next = getByIndex($words, activeWordIndex +1 );

				$current.classList.remove('uac-hidden');
				$current.classList.add('uac-visible');

				$previous.classList.remove('uac-visible');
				$previous.classList.add('uac-hidden');
				// check for extra theme;
				extraThemeAfter();
				// check if this need letter animation
				if(letterAnimThemes.indexOf(theme) > -1){
					letterIn($current.childNodes );
					letterOut($previous.childNodes );
				}

				activeWordIndex ++;
				// self call
				wordAnimatorTimeout = setTimeout(wordAnimator,_duration + animationDuration );
			}
			function extraThemeAfter(){
				switch(theme){
					case 'loading':
						elm.removeClass('uac-loading');
						setTimeout(function(){ elm.addClass('uac-loading'); }, 200);
						break;
					case 'clip':
						// delay 1 loop;
						setTimeout(cliping , _duration + 100 )
						break;
					case 'letter-type':
						elm.removeClass('uac-waiting');
						setTimeout(function(){
							// select words
							elm.addClass('uac-selected');
						} , _duration + 100 )
						break;
					default: '';
				}
			}
			/**
			 * trigger cliping animation onece;
			 */
			function cliping(){
				// calculate length of word;
				var width = $next.getBoundingClientRect().width;
				elm[0].style.width = '0px' ;
				setTimeout(function(){
					elm[0].style.width = (width + 15 )+'px' ;
				},1000)
			}

			// sequencially add .uac-in and .uac-out to letters
			var inLetterIndex = 0, outLetterIndex = 0;
			function letterIn(letters){
				if(theme == 'letter-type'){
					elm.removeClass('uac-selected');
				}

				if(letters[inLetterIndex]) {
					letters[inLetterIndex].classList.remove('uac-out');
					letters[inLetterIndex].classList.add('uac-in');
				}
					
				inLetterIndex++;
				if( inLetterIndex < letters.length ) {
					setTimeout(function(){ letterIn(letters) },letterAnimDelay );
				}else{ // finished all letter animation , now waitting for next
					inLetterIndex = 0;
					// flicker effect
					if(theme == 'letter-type'){
						elm.addClass('uac-waiting');
					}
				}
			}

			function letterOut(letters){
				if(theme == 'letter-type'){
					// hide all at onece;
					for(var ii=0;ii<letters.length; ii++){
						letters[ii].classList.remove('uac-in');
					}
					return;
				}
				if(letters[outLetterIndex]) {
					letters[outLetterIndex].classList.remove('uac-in');
					letters[outLetterIndex].classList.add('uac-out');
				}

				outLetterIndex++;

				if( outLetterIndex < letters.length ){
					return setTimeout(function(){ letterOut(letters) },letterAnimDelay );
				}else{
					for(var ii=0;ii<letters.length; ii++){
						letters[ii].classList.remove('uac-in');
					}
					outLetterIndex = 0;
					// 
				}
					
			}

			function getByIndex(arr,index){
				if( index >= arr.length ){
					return arr[0];
				}else if( index < 0 ){
					return arr[ arr.length-1 ];
				}else{
					return arr[index];
				}
			}

			// --------- run -------------
			wordAnimator();
			if(theme == 'clip') cliping();

			$scope.$on('$destroy',function(){
				// clear timeouts
				clearTimeout(wordAnimatorTimeout);
			})
		}
	}
})
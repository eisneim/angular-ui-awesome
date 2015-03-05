ua.directive('uaWords',function(){
	function parseWords(string){
		return string.split('|||');
	}

	return {
		restric:'E',
		template:function(elem,attr){
			var theme = attr.uaTheme ||'rotate';
			var words = attr.words || 'no|||words|||specified';

			words = parseWords(words);
			// build up template
			var tpl = '<span class="uac-words">';   
			for(var ii=0;ii<words.length ; ii++){
				tpl+= '<b '+ ( ii==0 ? 'class="uac-visible"':'')+'>'+ words[ii].trim() + '</b>';
			}
			tpl += '</span>';

			return tpl;
		},
		replace:true,
		// scope:{},
		link:function($scope,elm,attr,ctrl){
			var _duration = attr.uaDuration || 2500;
			var animationDuration = 1200;// in and out duration;

			var _letterDuration = 800;

			var theme = attr.uaTheme ||'rotate';
			 elm.addClass('uac-words-'+theme );

			var $words = elm.find('b');

			var activeWordIndex=0,$current = $words[0],$previous;
			function wordAnimator(){
				if(activeWordIndex >= $words.length ) activeWordIndex = 0;
				$current = getByIndex($words, activeWordIndex );
				$previous = getByIndex($words, activeWordIndex - 1 );
				
				$current.classList.remove('uac-hidden');
				$current.classList.add('uac-visible');

				$previous.classList.remove('uac-visible');
				$previous.classList.add('uac-hidden');
				// check for extra theme;
				extraTheme();

				activeWordIndex ++;
				// self call
				setTimeout(wordAnimator,_duration+animationDuration );
			}
			function extraTheme(){
				switch(theme){
					case 'loading':
						elm.removeClass('uac-loading');
						setTimeout(function(){ elm.addClass('uac-loading'); }, 200);
						break;

					default: '';
				}
			}
			// function wordin($word){
			// 	// $current.classList.add('uac-visible');
			// 	$current.className = 'uac-visible';
			// 	setTimeout(wordout , _duration )
			// }
			// function nextword(){
			// 	if(activeWordIndex >= $words.length ) activeWordIndex = 0;
			// 	$current = getByIndex($words, activeWordIndex );
			// 	$previous = getByIndex($words, activeWordIndex - 1 );
			// 	activeWordIndex ++;
			// }
			// function wordout($word){
			// 	 $current.className = 'uac-hidden';

			// 	setTimeout(function(){
			// 		$current.classList.remove('uac-hidden');
			// 		nextword();
			// 		wordin();
			// 	},animationDuration);
			// }

			function letterAnimator(){

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

			// ----------------------
			wordAnimator();
			// wordin()
		}
	}
})
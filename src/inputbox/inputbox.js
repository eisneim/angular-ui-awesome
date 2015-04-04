ua.directive('uaInput',['uaUtil',function(uaUtil){
	
	return {
		restrict: 'E',
		replace: true,
		template:function(tElm,attr ){
			var theme = attr['uaTheme'] || 'nao';
			var label = attr['uaLabel'] || 'input box';
			var inputId = uaUtil.idGen('uainput');


			var tpl = '<span class="uac-input input--'+theme+'" '+
					(attr['ngModel'] ?'ng-class="{ \'input--filled\':'+attr['ngModel']+'}"':'')+
				'>'
			
			var attributes = uaUtil.dirAttrToString(attr);
			
			tpl +=	'<input '+attributes+' class="input__field input__field--'+theme+'" type="text" id="'+inputId+'"/> ';

			var labelContent = '';
			if(['yoshiko','chisato','kozakura'].indexOf(theme)>-1){
				labelContent = attr['uaContent']||label;
			}
			// --- the label ----
			tpl += '<label class="input__label input__label--'+theme+'" for="'+inputId+'"> \
						<span class="input__label-content input__label-content--'+theme+'" data-content="'+labelContent+'">'+label+'</span> \
					</label>';

			// ------------------- some special theme's templates ---------------
			if(theme == 'nao'){
				tpl += '<svg class="graphic graphic--'+theme+'" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/></svg>';
			}else if(theme == 'shoko'){
				tpl += '<svg class="graphic graphic--shoko" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0"/><path d="M0,2.5c0,0,298.666,0,399.333,0C448.336,2.5,513.994,13,597,13c77.327,0,135-10.5,200.999-10.5c95.996,0,402.001,0,402.001,0"/></svg>';
			}else if(theme == 'kozakura'){
				tpl += '<svg class="graphic graphic--kozakura" width="300%" height="100%" viewBox="0 0 1200 60" preserveAspectRatio="none"><path d="M1200,9c0,0-305.005,0-401.001,0C733,9,675.327,4.969,598,4.969C514.994,4.969,449.336,9,400.333,9C299.666,9,0,9,0,9v43c0,0,299.666,0,400.333,0c49.002,0,114.66,3.484,197.667,3.484c77.327,0,135-3.484,200.999-3.484C894.995,52,1200,52,1200,52V9z"/></svg>';
			}

			tpl +='</span>';
			return tpl;
		},
	}
}]);
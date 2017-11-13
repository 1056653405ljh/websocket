function stylegrid()
{
	jQuery(".grid tbody tr").mouseover(function() {
			jQuery(this).addClass("over");
		}).mouseout(function() {
			jQuery(this).removeClass("over");
		}).click(function(){
			jQuery(this).siblings().removeClass("select");
			jQuery(this).addClass("select");
		});
	jQuery(".grid tbody tr:odd").addClass("jg");
}
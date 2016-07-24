window.onload = function()
{
	//画出所有的棋子
	var box = document.getElementById('box');
	var div;
	for(var i =0;i<20;i++)
	{
		for (var j = 0; j < 20 ; j++) 
		{
			div = document.createElement('div');
			div.className = 'block';
			div.id =i + '_' + j;
			box.appendChild(div);
		}
	}
	//画横、竖线
	var hang,shu;
	for(var i=0;i<20;i++)
	{	
		hang = document.createElement('div');
		hang.className = 'hangxian';
		hang.style.top=15+30*i+'px';
		box.appendChild(hang);

		shu = document.createElement('div');
		shu.className = 'shuxian';
		shu.style.left=15+30*i+'px';
		box.appendChild(shu);
	}


	//让棋盘可点击
	//开关思想
	// var kaiguan = true;
	// var white ={};
	// var black ={};
	// box.onclick=function(e)
	// {
	// 	if(e.target === this){return;}
	// 	var el = e.target;
	// 	if(white[el.id] || black[el.id]){return;}
	// 	//先处理落子
	// 	if (kaiguan)
	// 	{
	// 		el.className ='block black';
	// 		black[el.id] = true;
	// 		kaiguan = false;
	// 	}
	// 	else
	// 	{
	// 		el.className = 'block white';
	// 		white[el.id] =true;
	// 		kaiguan = true;
	// 	}
	// }
	var white ={};
	var black ={};
	//让鼠标能点击
	box.onclick =function(e)
	{	//点到自身 ||　点到线 || 点到白棋 || 点到黑棋
		if(e.target === this || !e.target.id || white[e.target.id] || black[e.target.id])
			{return;}
		e.target.className='block black';
		black[e.target.id]=true;
		if (panduan(black,e.target.id)) {
			var by =document.getElementById('by');
			by.style.display='block';
			setTimeout(function() {by.style.display='none';overgame();}, 500);
			return;
		};
		
		ai();

	};
	//让电脑自动下棋
	var ai =function()
	{
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
		while(white[x+'_'+y] || black[x+'_'+y])
		{
			x = Math.floor(Math.random()*19);
			y = Math.floor(Math.random()*19);
		}
		white[x+'_'+y]=true;
		document.getElementById(x+'_'+y).className='block white';

	}
	//判断
	var panduan = function(hash,id)
	{
		var t =id.split('_');//以“_”为分割点
		var x =Number(t[0]);
		var y =Number(t[1]);

		var tx,ty;
		var hang=1;var shu=1;var zuoxie=1;var youxie=1;

		tx=x;ty=y;while(hash[tx+'_'+(ty+1)]){hang++,ty++;};
		tx=x,ty=y;while(hash[tx+'_'+(ty-1)]){hang++,ty--;};
		if (hang>=5){return true;}

		tx=x;ty=y;while(hash[(tx-1)+'_'+ty]){shu++,tx--;};
		tx=x,ty=y;while(hash[(tx+1)+'_'+ty]){shu++,tx++;};
		if (shu>=5){return true;}

		tx=x;ty=y;while(hash[(tx-1)+'_'+(ty+1)]){zuoxie++,tx--;ty++};
		tx=x,ty=y;while(hash[(tx+1)+'_'+(ty-1)]){zuoxie++,tx++;ty--};
		if (zuoxie>=5){return true;}

		tx=x;ty=y;while(hash[(tx+1)+'_'+(ty+1)]){youxie++,tx++;ty++};
		tx=x,ty=y;while(hash[(tx-1)+'_'+(ty-1)]){youxie++,tx--;ty--};
		if (youxie>=5){return true;}

		return false;
	}
//结束游戏，重置游戏
	var overgame = function()
	{
		//遍历black,white,使其样式还原
		var over =document.getElementById('over');
			over.style.display='block';
			setTimeout(function() {over.style.display='none';}, 1000);
		for(var i in black){
			document.getElementById(i).className='block'
		}
		for(var i in white){
			document.getElementById(i).className='block'
		}
		black={};
		white={};
	
	}
}
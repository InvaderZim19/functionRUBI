var functionRUBI = functionRUBI || {};


functionRUBI.level0 = function(){};

functionRUBI.level0.prototype = {
	
	//load this level's specific map
 preload: function(){
 	this.load.tilemap('level0', 'assets/world/level0/tutlevel.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('Wall', 'assets/world/level0/walledges.png'); 	
	//this.load.image('bg', 'assets/world/level0/bg.png'); 
 	
 },
	
	
  create: function() {
  	 
 //local variables for enemies
 this.enemies = [];
 this.enemiesAlive;
 this.enemiesTotal;
 

 
 ///////////// Implementing map stuff///////////// 
  	  this.game.world.setBounds(0, 0, 2000, 1333);
  	  menuFilter();
  
  	  
 /////////////////////////////////////////////////////////////////////////////////////////////////////CHANGE 	  
	this.map = this.game.add.tilemap('level0'); 
	this.map.addTilesetImage('Wall','Wall');
    this.map.setCollisionBetween(1,9);
     
        this.wall = this.map.createLayer('Tile Layer 1');
        this.wall.resizeWorld(); 



 //Endgame goal
 this.goal = this.game.add.sprite(1504,224,'goal'); 
 this.goal.animations.add('squiggly');
  this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
  this.goal.body.setSize(64, 64, 0, 0);
  this.goal.anchor.setTo(.5,.5);
  this.goal.body.immovable = true;
 //////////
 
 
 //tutorial stuff///
 this.tutMove = this.game.add.sprite(274,935,'tutMovement'); 
 this.tutIntro = this.game.add.sprite(274,1135,'tutIntro'); 
 this.tutShoot = this.game.add.sprite(274,755,'tutShoot');
 this.tutShoot1 = this.game.add.sprite(204,545,'tutShoot1');
  this.tutShoot2 = this.game.add.sprite(204,385,'tutShoot2');
  
  this.tutHealth1 = this.game.add.sprite(1040,485,'tutHealth1');
  this.tutHealth = this.game.add.sprite(590,485,'tutHealth');
  
  this.tutUpgrade = this.game.add.sprite(1040,785,'tutUpgrade');
  this.tutUpgrade1 = this.game.add.sprite(1040,985,'tutUpgrade1');
  
    this.tutGoal = this.game.add.sprite(1540,485,'tutGoal');
 
 
 //////sss
 
 
 //adding player to map
 createBullets();
  	 this.player = this.game.add.sprite(96,1216,'player'); 
  	 this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  	 this.player.anchor.setTo(.5,.5);
  	 this.player.body.setSize(50, 50, 0, 0);
  	 this.player.collideWorldBounds = true;
  	 this.player.animations.add('walk');	    
 	 this.game.camera.follow(this.player);
 	 
 	 
 

  
  //keyboard and mouse control
 	cursors = {
                up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
                down:this.game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
 	this.QKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
this.EKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
 	
    


///adding enemies to map


this.enemies.push(new Enemy(1, functionRUBI, functionRUBI.enemyBullets, "mildew", 575, 333));




this.enemyGroup = this.game.add.group();

	for (var i = 0; i < this.enemies.length; i++) {
	var addenemy = this.enemies[i].sprite;
	this.enemyGroup.add(addenemy);
  	}  
  	
  	 //particle collision with wall
 this.emitHitWall = functionRUBI.game.add.emitter(0,0,500);
this.emitHitWall.makeParticles('spark');
  	
//implementing GUI////
	this.background = this.game.add.sprite(0,0,'screenOverlay');
	this.background.width =800;
	this.background.height =600;
	this.background.fixedToCamera = true;
   this.background.cameraOffset.setTo(0, 0);
   
    
 this.gui = this.game.add.sprite(0,0,'GUI'); 
 this.gui.anchor.setTo(.5,.5);
 this.player.addChild(this.gui);
 
 this.textArray1 = [];
	this.textArray1[0] = 'int'; 
	this.textArray1[1] = 'string'; 
	this.textArray1[2] = 'double'; 
	this.textArray1[3] = 'float'; 
	this.textArray1[4] = 'boolean';
 
 this.healthText = this.game.add.text(0, 0, '{rubucks:'+rubiHealth.rubucks+'}', { font: " 18px Courier", fill: "#2EFE2E" });
   this.healthText.fixedToCamera = true;
  
//this.player.addChild(this.healthText);

this.dataTypeText = this.game.add.text(0, 0, '{dataType: '+this.textArray1[ globalVar.gunVar]+'}', { font: " 18px Courier", fill: "#2EFE2E" });
this.dataTypeText.fixedToCamera = true;
  
   
   this.enemyText = this.game.add.text(0, 0, '{enemyHealth: NULL}', { font: " 18px Courier", fill: "#2EFE2E" });
this.enemyText.fixedToCamera = true;

 this.healthText.cameraOffset.setTo(320, 17);
 this.enemyText.cameraOffset.setTo(70, 17);
   this.dataTypeText.cameraOffset.setTo(530, 17);
//this.player.addChild(this.dataTypeText);



  },
  update: function() {
	updateMusic();
  	 
  	 
  	//////////////////// //COLLISION//////////////////////////////////////////
  	//player/enemy collsion with wall
    this.game.physics.arcade.collide(this.player, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.wall);
     this.game.physics.arcade.collide(this.enemyGroup, this.goal);
     
     //player collsion with goal
     this.game.physics.arcade.overlap(this.player,this.goal, this.endGame, null, this);
     
    //enemy collision with rubi bullet
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.intBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.doubleBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.floatBullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.stringBullets, this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.emitSBullets,  this.hitEnemy, null, this);
	this.game.physics.arcade.overlap(this.enemyGroup, functionRUBI.booleanBullets, this.hitEnemy, null, this);
     
     //bullet collsion with wall
    this.game.physics.arcade.overlap(functionRUBI.intBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.doubleBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.floatBullets, this.wall, this.killBullet, null, this);
    this.game.physics.arcade.overlap(functionRUBI.stringBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.emitSBullets, this.wall, this.killBullet, null, this);
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.wall, this.killBullet, null, this);


	// enemy bullet collision with player
	this.game.physics.arcade.overlap(functionRUBI.enemyBullets, this.player, this.hitRUBI, null, this);

	//enemy collsion with enemy
	this.game.physics.arcade.collide(this.enemyGroup, this.enemyGroup);


	filterUpdate();
  
  //////////Enemy update function////////////	
  	this.enemiesAlive = 0;

    for (var i = 0; i < this.enemies.length; i++)
    {
        if (this.enemies[i].alive)
        {
            this.enemiesAlive++;
            this.enemies[i].update(this.player);
        }
    }
    /////////////////
  	
  	
  	this.player.rotation = this.game.physics.arcade.angleToPointer(this.player)-((Math.PI/2)+this.game.math.degToRad(-180));
	functionRUBI.floatBullets.forEachAlive(floatMove,this);  
    functionRUBI.floatBullets.forEachAlive(floatRotate,this);
	

//Player movement code///////////    
    this.player.body.velocity.x = 0;
 	this.player.body.velocity.y = 0;
 	

    if (cursors.up.isDown){
    	walkAudio.play('',0,globalVar.soundfx,false,false);
    	 this.player.animations.play('walk', 8);
          this.player.body.velocity.y = -(300+rubiUpgrade.speed);
    } else if (cursors.down.isDown){
    	walkAudio.play('',0,globalVar.soundfx,false,false);
    
    	this.player.animations.play('walk', 8);
         this.player.body.velocity.y = (300+rubiUpgrade.speed);
    }

    if (cursors.left.isDown){
    walkAudio.play('',0,globalVar.soundfx,false,false);
    	this.player.animations.play('walk', 8);
              this.player.body.velocity.x = -(300+rubiUpgrade.speed);
    }else if (cursors.right.isDown){
    	walkAudio.play('',0,globalVar.soundfx,false,false);
    	this.player.animations.play('walk', 8);
              this.player.body.velocity.x = (300+rubiUpgrade.speed);
    }
    
    

     
    
    //switches between bullet. bulletSwitch found in Bullet.js
    this.QKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    this.EKey.onDown.add(bulletSwitch,this);
     globalVar.swap = 0;
    
    
    //shoots each type of bullet
     if (this.game.input.activePointer.isDown) {
     	adjustRate( globalVar.gunVar);
     	if ( globalVar.gunVar==0){
    		intFire(this.player);
    	}else if( globalVar.gunVar==1){
    		stringFire(this.player);
    	} else if ( globalVar.gunVar ==2){
    		doubleFire(this.player);
    	}else if ( globalVar.gunVar ==3){
    		floatFire(this.player);
    	}
    	else if( globalVar.gunVar ==4){
    		booleanFire(this.player);
    	}
        
    }
    
    
   ///Switching of frames of the glowing thing around RUBI & the text
    this.healthText.text = '{rubucks: '+rubiHealth.rubucks+'}';
    if(rubiHealth.rubucks>100){
    	this.healthText.fill = "#2EFE2E"; 
    } else {
    	this.healthText.fill = "#FF7F7F"; 
    }
    
     this.dataTypeText.text= '{dataType: '+this.textArray1[ globalVar.gunVar]+'}';
     this.gui.frame=  globalVar.gunVar;
    
    //fades away bullet explosions & other animation details
     this.emitHitWall.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	 functionRUBI.emitSBullets.forEachAlive(function(p){
		p.alpha= p.lifespan / 1000;
	});
	functionRUBI.emitBoolean.forEachAlive(function(p){
		p.alpha= p.lifespan / 500;
	});
	this.goal.animations.play('squiggly',6);
	
	
	 	if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
	
  },
  

  ///////kills bullets if it touches a wall//////
  killBullet: function(bullet,wall){
wallAudio.play();
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
 	 bullet.kill();  	
  },
  
  /////decrements RUBI's health when enemy bullet hits her///////
  hitRUBI: function(wall,bullet){
  	if(functionRUBI.floatBullets.countLiving()>0){
  		var floatBullet = functionRUBI.floatBullets.getFirstAlive();
  		float2Audio.play();
  		floatBullet.kill();
  	} else{
  		 hurtAudio.play();
  	rubiHealth.rubucks -=40;
  	}
  	
  	this.emitHitWall.x = bullet.x;
		this.emitHitWall.y = bullet.y;
		this.emitHitWall.start(true,500,null,10);	
  	bullet.kill();  	
  	if (rubiHealth.rubucks <= 0) {
  		rubiHealth.dead = true;
  		this.endGame();
  	}
  },
  
  ///////kills enemy if bullet hit enemy//////
  hitEnemy: function(enemy,bullet){
		
	bulletDamage = getBulletDamage(bullet);	
	
	enemy.health -= bulletDamage+rubiUpgrade.damage;
	
	if(enemy.health<=0){
		enemyHurtAudio.play();
		enemy.health =0;
	} else{
		followerHurtAudio.play();
		
	}
	
	this.enemyText.text = '{enemyHealth: '+enemy.health+'}';
	
	if(bullet.key == 'stringBullet'){
		stringExplosion(bullet);
	}
	
	if (enemy.health <= 0)
    {
    	endLevel.enemyBucks += getEnemyValue(enemy);
        enemy.alive = false;
        enemy.kill();
        
    }
	
	this.emitHitWall.x = enemy.x;
		this.emitHitWall.y = enemy.y;
		this.emitHitWall.start(true,500,null,10);
  	bullet.kill();		
  },
  
  
  /////////endgame/////////////////
  endGame: function(){
  	fadeoutMus(easylevelMusic);
  	checkLevel.level0 = true;
  	endLevel.levelFin = 0;
  	functionRUBI.RUBIBullets.destroy(true);
  	this.enemyGroup.destroy(true);
  		this.fade('EndGame');
  //	this.game.state.start('EndGame');
  },
  
  fade: function (nextState) 
    {
    	if(rubiHealth.dead == true){
    		failureAudio.play('',0,globalVar.soundfx,false,false);
    		endfade = this.game.add.sprite(0,0,'endFail'); 
    	} else{
    		completeAudio.play('',0,globalVar.soundfx,false,false);
    		endfade = this.game.add.sprite(0,0,'endSucess'); 
    	}
    	endfade.fixedToCamera = true;
        endfade.alpha = 0;
 
        this.nextState = nextState;

        s = this.game.add.tween(endfade);
        s.to({ alpha: 1 }, 2000, null);
        s.onComplete.add(this.changeState, this);
        s.start();
    },

    changeState: function () 
    {
    	//functionRUBI.transitionPlugin.to('EndGame');
        this.game.state.start('EndGame');
        this.fadeOut();
    },

    fadeOut: function () 
    {
    	console.log("HERE");
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.beginFill(this.fadeColor, 1);
       spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.fixedToCamera = true;
        spr_bg.alpha = 1;
        spr_bg.endFill();

        s = this.game.add.tween(spr_bg);
        s.to({ alpha: 0 }, 2000, null);
        s.start();
    },
  
  
  //debug functions
render: function(){
	this.game.debug.text('',100,100);
//	this.game.debug.soundInfo(easylevelMusic, 20, 32);
//	 this.game.debug.text("DEBUGTEXT",100,100);
	// this.game.debug.text(" globalVar.gunVar "+ globalVar.gunVar,100,120);
	 //this.game.debug.text("gunrate "+fireRate,100,140 );
	// this.game.debug.text("Px "+this.player.x,100,160);
	  // this.game.debug.text("Py "+this.player.y,100,180);
	 //  this.game.debug.body(this.player);
	// this.game.debug.text("RUBUCK "+(rubiHealth.rubucks),100,200);
	
	},

};


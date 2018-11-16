	    const WIDTH = 300;
        const HEIGHT = 200;
        
        var center = new vec2(WIDTH / 2, HEIGHT / 2);
        var context;
        var canvas;
        var bullets = new Array();
        var counter = 0.0;


        window.addEventListener('load', init, false);
        
        function vec2(x, y)
        {
            this.x = x;
            this.y = y;
        }

        function Bullet2(x, y, velocity)
        {
            ///////////////////////
            // constructor block //
            ///////////////////////
            this.x = x;
            this.y = y;
            this.radius = 5;
            this.velocity = velocity;

            /////////////////////
            // functions block //
            /////////////////////
            this.isOffScreen = function()
            {
                // if any of these conditionals are true then the bullet can't be seen.
                return (this.x + this.radius < 0)
                    || (this.x - this.radius > WIDTH)
                    || (this.y + this.radius < 0)
                    || (this.y - this.radius > HEIGHT);
            }

            this.update = function()
            {
                //move the bullet by adding its velocity to its position.
                this.x += this.velocity.x / 4;
                this.y += this.velocity.y / 4;
            }

            this.draw = function()
            {
                //beginPath() is used to START a line drawing.
                context.beginPath();

                //arc() lets you draw an arc by specifying a center, start angle and end angle.
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);

                //stroke() commits the drawing
                context.strokeStyle = "#00CC44"
                context.stroke();
            }
        }

        function Bullet1(x, y, velocity)
        {
            ///////////////////////
            // constructor block //
            ///////////////////////
            this.x = x;
            this.y = y;
            this.radius = 10;
            this.velocity = velocity;

            /////////////////////
            // functions block //
            /////////////////////
            this.isOffScreen = function()
            {
                // if any of these conditionals are true then the bullet can't be seen.
                return (this.x + this.radius < 0)
                    || (this.x - this.radius > WIDTH)
                    || (this.y + this.radius < 0)
                    || (this.y - this.radius > HEIGHT);
            }

            this.update = function()
            {
                //move the bullet by adding its velocity to its position.
                this.x += this.velocity.x / 6;
                this.y += this.velocity.y / 6;
            }

            this.draw = function()
            {
                //beginPath() is used to START a line drawing.
                context.beginPath();

                //arc() lets you draw an arc by specifying a center, start angle and end angle.
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);

                //stroke() commits the drawing
                context.strokeStyle = "#FF6611"
                context.stroke();
            }
        }

        function Bullet(x, y, velocity)
        {
            ///////////////////////
            // constructor block //
            ///////////////////////
            this.x = x;
            this.y = y;
            this.radius = 15;
            this.velocity = velocity;
            
            /////////////////////
            // functions block //
            /////////////////////
            this.isOffScreen = function()
            {
                // if any of these conditionals are true then the bullet can't be seen.
                return (this.x + this.radius < 0)
                   || (this.x - this.radius > WIDTH)
                   || (this.y + this.radius < 0)
                   || (this.y - this.radius > HEIGHT);
            }
            
            this.update = function()
            {
                //move the bullet by adding its velocity to its position.
                this.x += this.velocity.x / 8;
                this.y += this.velocity.y / 8;
            }
            
            this.draw = function()
            {
                //beginPath() is used to START a line drawing.
                context.beginPath();
                
                //arc() lets you draw an arc by specifying a center, start angle and end angle.
                context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
                
                //stroke() commits the drawing
                context.strokeStyle = "#660088"
                context.stroke();
            }
        }
        
        function init(){            
            canvas = document.getElementById('c');
            context = canvas.getContext('2d');
            
            runLoop();
        }
        
        function runLoop(){
            //remove everything that we drew out previous frame from the screen
            context.clearRect(0, 0, WIDTH, HEIGHT);
            
            //create a new bullet each frame
            var bullet = new Bullet(center.x, center.y, new vec2(3 * Math.sin(counter), 1.5 * Math.cos(counter)));
            bullets.push(bullet);


/*
            //Secondary patterns

            //create a new bullet each frame
            var bullet1 = new Bullet1(center.x, center.y, new vec2(-1 * Math.sin(counter), -.5 * Math.cos(counter)));
            bullets.push(bullet1);

            //create a new bullet each frame
            var bullet2 = new Bullet2(center.x, center.y, new vec2(1 * Math.sin(counter),.5 * Math.cos(counter)));
            bullets.push(bullet2);
*/
            //iterate throughout all of the bullets to update and draw them
            for(var i = 0; i < bullets.length; i++)
            {
                //get the next bullet from our array
                var b = bullets[i];
                
                //let the bullet update itself
                b.update();
                
                //remove bullets that are off screen
                if(b.isOffScreen())
                    bullets.splice(i, 1);
                
                //let the bullet draw itself
                b.draw();
            }
            
            // increment the counter and call the runLoop function after a 14 ms delay
            counter += 0.1;
            window.setTimeout(runLoop, 10);
        }
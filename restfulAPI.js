// 参考链接： http://blog.csdn.net/zxsrendong/article/details/17006185
var mysql = require("mysql");
function WAP_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

WAP_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
	router.all('*', function(req, res, next) {  
		res.header("Access-Control-Allow-Origin", "*");  
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
		res.header("X-Powered-By",' 3.2.1')  
		res.header("Content-Type", "application/json;charset=utf-8");  
		next();  
	});
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    router.post("/users",function(req,res){
        var query = "INSERT INTO ??(??,??) VALUES (?,?)";        
        var table = ["user_login","user_email","user_password",req.body.email,md5(req.body.password)];
        query = mysql.format(query,table);
        console.log(query);
        connection.query(query,function(err,rows){
            if(err) {
            	console.log(err)
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + query});
            } else {
                res.json({"Code" : 200, "Message" : "User Added !"});
            }
        });
    });
    router.get("/users",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["user_login"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
            	console.log(err)
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + query});
            } else {
                res.json({"Code" : 200, "Message" : "Success", "Users" : rows});
            }
        });
    });
    router.get("/users/:user_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["user_login","user_id",req.params.user_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
            	console.log(err)
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + query});
            } else {
                res.json({"Code" : 200, "Message" : "Success", "Users" : rows});
            }
        });
    });
    router.put("/users",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
            	console.log(err)
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + query});
            } else {
                res.json({"Code" : 200, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });
    router.delete("/users/:email",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["user_login","user_email",req.params.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
            	console.log(err)
                res.json({"Error" : true, "Message" : "Error executing MySQL query:" + query});
            } else {
                res.json({"Code" : 200, "Message" : "Deleted the user with email "+req.params.email});
            }
        });
    });
}

module.exports = WAP_ROUTER;
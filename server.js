//ExpressJS Server Created

const express = require("express");
const app = express();
var port = 3000;
var cors = require("cors");
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());

// my sql database created

var mysql = require('mysql');
const { notDeepEqual } = require("assert");
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '1234',
    database: "mydb"


});
db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    //create table in mysql database
    
    var sql = "CREATE TABLE Students(StudentID int, StudentName text,Gender text,Birthday varchar(255), Address varchar(255),Email varchar(255),PhoneNumber int,AcadamicYear varchar(255), PRIMARY KEY(StudentID))"

    var sql = 'CREATE TABLE Subjects(SubjectID int,SubjectName varchar(255),TeacherName varchar(255),PRIMARY KEY(SubjectID))'

    var sql = 'CREATE TABLE Semesters(SemesterNo int,SemesterName varchar(255),PRIMARY KEY(SemesterNo))'
    
    var sql = 'CREATE TABLE Marks(ID int AUTO_INCREMENT PRIMARY KEY,StudentID int,SubjectID int,SemesterNO int,Mark int,Grade varchar(255) ,CONSTRAINT UC_Marks UNIQUE(StudentID,SubjectID,SemesterNO),FOREIGN KEY (StudentID) REFERENCES Students(StudentID), FOREIGN KEY (SubjectID) REFERENCES Subjects(SubjectID), FOREIGN KEY (SemesterNO) REFERENCES Semesters(SemesterNo))'
    
   
    db.query(sql, function (err, result) {
        if (err) {
            console.error
        } else {
            console.log('new table was Created')
            //console.log('table was Deleted')

        }
    });
});

//create express server
app.listen(port, () => {
    console.log('server running on %PORT%'.replace('%PORT%', (port)))
});
//------------------------------------------------Students Table API---------------------------------------------------//


app.post('/Api/Students/add', function (req, res) {
    try {
        const { StudentID,
            StudentName,
            Gender,
            Birthday,
            Address,
            Email,
            PhoneNumber,
            AcadamicYear
        } = req.body;
        var sql = 'INSERT INTO Students(StudentID,StudentName,Gender,Birthday,Address,Email,PhoneNumber,AcadamicYear) VALUES(?,?,?,?,?,?,?,?)';
        var parmas = [StudentID, StudentName, Gender, Birthday, Address, Email, PhoneNumber, AcadamicYear]
        db.query(sql, parmas, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "Message": "Success",
                    "StudentID": this.lastStudentID
                })
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }
});
app.get('/Api/Students/get', function (req, res) {
    try {
        var sql = 'SELECT * FROM Students'
        var parmas = []
        db.query(sql, parmas, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result

                })
                // console.log(result);
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }

});

app.put('/Api/Students/update/:StudentID', function (req, res) {
    try {
        const { StudentID,
            StudentName,
            Gender,
            Birthday,
            Address,
            Email,
            PhoneNumber,
            AcadamicYear
        } = req.body;
        var sql = 'UPDATE Students set StudentName=?,Gender=?,Birthday=?,Address=?,Email=?,PhoneNumber=?,AcadamicYear=? WHERE StudentID=?'
        var parmas = [StudentName, Gender, Birthday, Address, Email, PhoneNumber, AcadamicYear, StudentID]
        db.query(sql, parmas, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({ "Message": "Update Success!" })
            }
        })

    } catch (error) {
        res.status(400).send(error);
    }

});

app.delete('/Api/Students/delete/:StudentID', function (req, res) {
    try {
        var parmas = req.params.StudentID
        var sql = 'DELETE FROM Students WHERE StudentID=? '
        db.query(sql, parmas, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({ "Message": "Delete Success!" })
            }

        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/Api/Students/select/:StudentID', function (req, res) {
    try {
        var sql = 'SELECT * FROM Students WHERE StudentID=?'
        var params = req.params.StudentID;
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result
                });
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});


//-------------------------------------------Subject table API-----------------------------------------------------//

app.post('/Api/Subjects/add', function (req, res) {
    try {
        const { SubjectID,
            SubjectName,
            TeacherName
        } = req.body
        var sql = 'INSERT INTO Subjects(SubjectID, SubjectName ,TeacherName) VALUES(?,?,?)'
        var params = [SubjectID, SubjectName, TeacherName]
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success!",
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);

    }

});

app.get('/Api/Subjects/get', function (res) {
    try {
        var sql = 'SELECT * FROM Subjects'
        var params = []
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result
                })
            }
        })

    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/Api/Subjects/update/:SubjectID', function (req, res) {
    try {
        const { SubjectID,
            SubjectName,
            TeacherName
        } = req.body
        var sql = 'UPDATE Subjects set SubjectName=?,TeacherName=? WHERE SubjectID=?'
        var params = [SubjectName, TeacherName, SubjectID]
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.json({
                    "Message": "Subject Update Success!"
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }

});

app.delete('/Api/Subjects/delete/:SubjectID', function (req, res) {
    try {
        var sql = 'DELETE FROM Subjects WHERE SubjectID=?'
        var params = req.params.SubjectID
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message });
            } else {
                res.json({
                    "Message": "Subject Delete Success!"
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/Api/Subjects/get/:SubjectID', function (req, res) {
    try {
        var sql = 'SELECT * FROM Subjects WHERE SubjectID=?'
        var params = req.params.SubjectID;
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result
                });
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }

});



//------------------------------------------------Semester Table API-----------------------------------------------------

app.post('/Api/Semesters/add', function (req, res) {
    try {
        const { SemesterNo,
            SemesterName
        } = req.body
        var sql = 'INSERT INTO Semesters(SemesterNO,SemesterName) VALUES(?,?)'
        var params = [SemesterNo, SemesterName]
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Semester add Success!"
                })
            }

        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/Api/Semesters/get', function (req, res) {
    try {
        var sql = 'SELECT * FROM Semesters'
        var params = []
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/Api/Semesters/update/:SemesterNO', function (req, res) {
    try {
        const { SemesterNo,
            SemesterName
        } = req.body
        var sql = 'UPDATE Semesters set SemesterName=? WHERE SemesterNO=?'
        var params = [SemesterName, SemesterNo]
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Update Success!",
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/Api/Semesters/delete/:SemesterNo', function (req, res) {
    try {
        var sql = 'DELETE FROM Semesters WHERE SemesterNO=?'
        var params = req.params.SemesterNo
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "Message": err.message })
            } else {
                res.json({
                    "Message": "Delete Success !"
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/Api/Semesters/get/:SemesterNo', function (req,res) {
    try {
        var sql = 'SELECT * FROM Semesters WHERE SemesterNo=?'
        var params = req.params.SemesterNo
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success!",
                    "Data": result
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

//----------------------------------------------------Marks Table Api-------------------------------------------------

app.post('/Api/Marks/add', function (req, res) {
    try {
        const { 
            StudentID,
            SubjectID,
            SemesterNO,
            Mark,
            Grade
        } = req.body;
        var sql = 'INSERT INTO Marks(StudentID,SubjectID,SemesterNO,Mark,Grade) VALUES(?,?,?,?,?)';
        var parmas = [StudentID, SubjectID, SemesterNO,Mark,Grade]
        db.query(sql, parmas, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            } else {
                res.json({
                    "Message": "Success",

                })
            }
        })
    } catch (err) {
        res.status(400).send(err);
    }
});

app.get('/Api/Marks/get', function (req,res) {
    try {
        var sql = 'SELECT * FROM Marks'
        var params = req.params.ID
        db.query(sql, params, function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Success",
                    "Data": result
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/Api/Marks/update/:ID', function (req, res) {
    try {
        const { ID,
            StudentID,
            SubjectID,
            SemesterNO,
            Mark,
            Grade
        } = req.body;
        var sql = 'UPDATE Marks set StudentID=?,SubjectID=?,SemesterNo=?,Mark=?,Grade=? WHERE ID=?'
        var params = [StudentID, SubjectID, SemesterNO,Mark,Grade, ID]
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "error": err.message })
            } else {
                res.json({
                    "Message": "Update Success!"
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }

});

app.delete('/Api/Marks/delete/:ID', function (req, res) {
    try {
        var sql = 'DELETE FROM Marks WHERE ID=?'
        var params = req.params.ID
        db.query(sql, params, function (err) {
            if (err) {
                res.status(400).json({ "Message": err.message })
            } else {
                res.json({
                    "Message": "Delete Success !"
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/Api/Marks/get/:ID',function(req,res){
    try {
        var sql='SELECT * FROM Marks WHERE ID=?'
        var params=req.params.ID
        db.query(sql,params,function(err,result){
            if(err){
                res.status(400).json({ "Message": err.message})
            }else{
                res.json({
                    "Message": "Success !",
                    "Data":result
                })
            }
        })
    } catch (error) {
        res.status(400).send(error);
    }
});


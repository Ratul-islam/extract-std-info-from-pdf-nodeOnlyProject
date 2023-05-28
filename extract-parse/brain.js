
const fs = require('fs'); 


var location = 'half-first.txt'
var data 

fs.readFile(location , 'utf8', (err, exdata) => {
  if (err) {
    console.error(err);
    return;
  }
  data = exdata


  //extract the data

  
var rawData = data;
var collages = data.match(/\n\d{5}\s(-)/g);
var end = data.match(/\s(,)+[A-Z]/g);
const clgArr=[];
const stdAndClg =[]
const endLocation=[];
const newData=[];
    
const finalData=[]

    
    collages.map((collage)=>{
        for(var e = rawData.indexOf(collage) ; e<=rawData.length; e= e+1){
            if(rawData[e] == ','){
                clgArr.push(rawData.slice(rawData.indexOf(collage)+9,e-1))
                break
            }
        }
    })
    
    
    var notes = Array.from(rawData?.matchAll("Note:"))
    notes.map((note)=> endLocation.push(note.index))
    for(let times= 0; times<clgArr.length; times++){
        let trimedData = {
            college: clgArr[times],
            data: rawData.slice(rawData.indexOf(clgArr[times]),endLocation[times])
        }
        newData.push(trimedData)
    }

            // *********************************************************************************//



            newData.map((data)=>{
                rolls = data.data.match(/\d{6}/g);
                rolls.map((roll)=>{
                    // console.log(roll)
                    for(var i=0;i<=rolls.length;i++){
                        if(data.data[data.data.indexOf(roll)+7]==`(`){
                            var frsm
                            if(data.data.includes('th Semester')){
                                frsm = data.data.slice(data.data.match('th Semester').index-1 ,data.data.match('th Semester').index+2)
                            }else if(data.data.includes('nd Semester')){
                                frsm = data.data.slice(data.data.match('nd Semester').index-1 ,data.data.match('nd Semester').index+2)
                            }else if(data.data.includes('st Semester')){
                                frsm = data.data.slice(data.data.match('st Semester').index-1 ,data.data.match('st Semester').index+2)
        
                            }else {
                                frsm = 'no semester found'
                            }
                            
                            let info = {
                                roll: roll,
                                technology: data.data.slice(data.data.match('Examination of').index +14,data.data.match('held in').index-7),
                                regulation : data.data.slice(data.data.match('Regulation').index-5 ,data.data.match('Regulation').index),
                                college: data.college,
                                result: [{
                                    semester: frsm,
                                    status : data.data.slice(data.data.indexOf(roll)+8 , data.data.indexOf(roll)+12)
                                }],
                                passed: true,
                            }
                            finalData.push(info)
                        break
                        }   
                 }


                 for(var i=0;i<=rolls.length;i++){
                    if(rawData[rawData.indexOf(roll)+7]==`{`){
                        for(var start = rawData.indexOf(roll)+7; start<=rawData.length; start = start+1 ){
                            if(rawData[start]=='}'){
                                var frsm
                                if(rawData.includes('th Semester')){
                                    frsm = rawData.slice(rawData.match('th Semester').index-1 ,rawData.match('th Semester').index+2)
                                }else if(rawData.includes('nd Semester')){
                                    frsm = rawData.slice(rawData.match('nd Semester').index-1 ,rawData.match('nd Semester').index+2)
                                }else if(rawData.includes('st Semester')){
                                    frsm = rawData.slice(rawData.match('st Semester').index-1 ,rawData.match('st Semester').index+2)
            
                                }else {
                                    frsm = 'no semester found'
                                }
            
                                let info = {
                                    roll: roll,
                                    technology: rawData.slice(rawData.match('Examination of').index +14,rawData.match('held in').index-7),
                                    regulation : rawData.slice(rawData.match('Regulation').index-5 ,rawData.match('Regulation').index),
                                    college: data.college,
                                    result: [
                                        {
                                            semester: frsm,
                                            status: rawData.slice(rawData.indexOf(roll)+7,start+1)
                                        }
                                    ],
                                    passed: false,
                                }
                                finalData.push(info)
                                break
                            }
                        }
                        break
            
                    }
                }
                 
                })
            }
            )
            // console.log((JSON.stringify(finalData).length))

            // for
            data = JSON.stringify(finalData)
            fs.writeFileSync(location+'.json', data, (err) => { 
                if(err) { 
                throw err; }
                console.log("Data has been written to file successfully."); 
                }); 
        })








// const data = "This is the new content of the file."; 

function insert(num)   
{  
document.form1.textview.value = document.form1.textview.value + num; 
console.log(num,'Added') 
}  
  
// Use equal() function to return the result based on passed values.  
function equal()  
{  
var exp = document.form1.textview.value;  
if(exp)  
{  
document.form1.textview.value = eval(exp); 
console.log(eval(exp),'Total'); 
}  
}  
  
function backspace()  
{  
var exp = document.form1.textview.value;  
document.form1.textview.value = exp.substring(0, exp.length - 1); /* remove the element from total length ? 1 */  
}  
  
  

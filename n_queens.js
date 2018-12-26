var cols=[],
arr1=[],
arr2=[],
arr3=[],
a={},
b={},
count=0,
star=[],
rep=0,
n=8;


      // Creating the Index for the n*n table.
              for(i=1;i<=n;i++)
           {
                cols.push(i)
           }  
                var str = cols.join('');
                //console.log(str);

      // Function to perform permutation.
function getAllPermutations(string) 
  {
                var results = [];
      // Base case
             if (string.length === 1) 
           {
                results.push(string);
                return results;
           }

             for (var i = 0; i < string.length; i++) 
           {
      // Storing the first character in the string to a variable and applying permutation function recursively to the rest and appending 
      // the first character back to the results.
                var firstChar = string[i];
                var charsLeft = string.substring(0, i) + string.substring(i + 1);
                var innerPermutations = getAllPermutations(charsLeft);
             for (var j = 0; j < innerPermutations.length; j++) 
           {
                results.push(firstChar + innerPermutations[j]);
           }
           }
                return results;
  }

      // Calling the permutation function with a parameter 'str'.
                var vec=getAllPermutations(str);
                //console.log(vec); 

      // Function to convert string to integer.
function num(val)
{

                return Number(val);

}


             for(var j of vec)
           {

     // converting the string array to integer using map reduce and splitting the numbers to form array of permutations and 
     // finally pushing it to an array arr3
 
                arr3.push(j.split('').map(num));

           }
                //console.log(arr3);

             for(var k of arr3)
     {         
            
             for (i=0;i<cols.length;i++)
           {

     // Adding the values of the array 'cols' to corresponding elements in array 'k'.
     // Subtracting the values of the array 'cols' from corresponding elements in array 'k'.
               
               arr1.push(k[i]+i);
               arr2.push(k[i]-i);
               //console.log(arr1);
           }
     
     // converting array into Set so that the duplicate values in the array will be removed.
               a= new Set(arr1);                            
               b= new Set(arr2);
               //console.log(arr1);
     
     // checking whether the size of both the sets a and b are equal to the value "n". The value of the array 'k' for which
     // the conditions are satisfied will be the solutions of N-Queens problem.
            if (n==(a.size) && n==(b.size))
          {
               console.log(k.join(''));
               count = count + 1;
               console.log("Graphical Representation :"+"\n");
     

     // Graphical representation of the Solutions.

            for (var p=0;p<n;p++)
          {
            for(var m=0;m<n;m++)
          {    
               var hash='#';
               star[m]=hash;
                 
          }
               rep = k[p]-1;
               star[rep]="Q";
               console.log(star);
     // resetting the array star for reuse.          
               star=[];
          }
               console.log("\n");

          }
     
     // clearing the values in both arrays arr1 and arr2 for reuse in the loop's next execution.
               arr1=[];
               arr2=[];
     
     }

              console.log("Number of Solutions :"+" "+count);

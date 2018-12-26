from itertools import permutations
count=0
n = 8
cols = range(n)
for vec in permutations(cols):

# Adding the values of the array 'cols' to corresponding elements in array 'k'.
# Subtracting the values of the array 'cols' from corresponding elements in array 'k'.

    if (n == len(set(vec[i]+i for i in cols)) == len(set(vec[i]-i for i in cols))):     
# converting the output tuple vec to a list explicitly.       
       vecl=list(vec)
       for i in range(8):
          vecl[i]=vecl[i]+1;
       vstr=" ".join(str(x) for x in vecl)   
       print(vstr)
       count=count+1
print("The total Number of Solutions : "+" "+str(count))

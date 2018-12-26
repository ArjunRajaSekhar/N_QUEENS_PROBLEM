# N_QUEENS_PROBLEM
The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal. The eight queens puzzle is an example of the more general n queens problem of placing n non-attacking queens on an n×n chessboard, for which solutions exist for all natural numbers n with the exception of n=2 and n=3

Functional versus Imperative Programming

Perhaps the major difference between the Functional and Imperative paradigm in the minds of most programmers is that functional programming is hard and imperative programming less hard. With functional programming we are constrained by having to replace iteration, for and while in Python, with either recursion or the use of higher order functions via map, reduce, etc. which basically handle the recursion for us.

Another constraint enforced in most functional languages is that variables may be assigned only once at a given level of recursion. However, once iteration is gone, this becomes a non-issue.

We are going to write a small program in two ways, iterative and functional, with the same set of functions. Both will produce the same result. In fact, the iterative and functional versions of the functions may be interchanged. The idea is to see the transition from one paradigm to the other as pretty natural and intuitive.
The Eight Queens Puzzle

The Eight Queens puzzle is a nice example of essentially using a tree search for solutions to a constraint problem.

Here is an example of a solution to the puzzle:

. . Q . . . . .
. . . . . Q . .
. . . Q . . . .
. Q . . . . . .
. . . . . . . Q
. . . . Q . . .
. . . . . . Q .
Q . . . . . . .

The dots represent empty squares on a standard 8 by 8 chessboard. The Q's are where the 8 queens are placed. Every row, column and diagonal has exactly one queen. Another way of putting it is that none of the eight queens is in danger of imminent capture.

In this project we'll represent solutions to the puzzle using an eight character string. In the above solution the representative string is '36428571'. It means that, starting from the top, the first row contains its queen in column 3, the second row in column 6 and so on. For a full solution the representative string has a length of 8 and, of course, contains each of the digits 1-8 exactly once.

It turns out that there are exactly 92 solutions that our program will generate. And on my laptop running Ubuntu all the solutions are found in under 50 milliseconds. The 92 solutions contain many that are essentially duplicates. A solution may be flipped vertially or horizontally; or around either diagonal; or rotated 90, 180, or 270 degrees. Some of the duplications are even duplications of each other:

Original Solution      Flipped Vertically     Then Horizontally

. . Q . . . . .        Q . . . . . . .        . . . . . . . Q
. . . . . Q . .        . . . . . . Q .        . Q . . . . . .
. . . Q . . . .        . . . . Q . . .        . . . Q . . . .
. Q . . . . . .        . . . . . . . Q        Q . . . . . . .
. . . . . . . Q        . Q . . . . . .        . . . . . . Q .
. . . . Q . . .        . . . Q . . . .        . . . . Q . . .
. . . . . . Q .        . . . . . Q . .        . . Q . . . . .
Q . . . . . . .        . . Q . . . . .        . . . . . Q . .

The two flips above are equivalent to rotating the board 180 degrees.
Partial Solutions

Our code will generate solutions row by row from top to bottom. Partial or incomplete solutions may generate additional solutions containing one more row. Here is an example of a 4 row partial solution that can generate 2 further 5 row partials:

Board '6471'    ==>     '64713'         or      '64718'
. . . . . Q . .         . . . . . Q . .         . . . . . Q . .
. . . Q . . . .         . . . Q . . . .         . . . Q . . . .
. . . . . . Q .         . . . . . . Q .         . . . . . . Q .
Q . . . . . . .         Q . . . . . . .         Q . . . . . . .
. . . . . . . .         . . Q . . . . .         . . . . . . . Q
. . . . . . . .         . . . . . . . .         . . . . . . . .
. . . . . . . .         . . . . . . . .         . . . . . . . .
. . . . . . . .         . . . . . . . .         . . . . . . . .

Even the empty string is a partial solution and generates 8 further with a queen in each column of row one: ['1','2','3','4','5','6','7','8'].

The meat of the program consists of taking a partial solution, say one with the top 4 rows filled in, to generate one or more with a 5th row. If there are none the partial solution is abandoned. We proceed with other partial solutions until the ones with all eight rows are produced.
The Code: Imperative and Functional

Here are links to the code for both the imperative and functional versions.

First let's look at the function that nicely formats a partial solution string into a chess board that's much easier on our (human) eyes. Here is the code for both modes.

   #  imperative                             # functional

1   def printBoard(partial) :             def printBoard(partial) :
2     for digit in partial :                if partial :
3       col = int(digit)                      col = int(partial[0])
4       lin = ". "*(col-1) + "Q " + \         lin = ". "*(col-1) + "Q " + \
5             ". "*(SIZE-col)                       ". "*(SIZE-col)
6       print lin                             print lin
7                                             printBoard(partial[1:])

In the imperative code on the left it's fairly easy to see what's going on. For each row of the board that contains a queen, the for loop sets col to each digit in the partial board and a line is constructed with the Q in the appropriate column and with '.'s in the others.

The functional version does exactly the same thing, although a bit differently. The first digit from the (partial) solution determines the column. The line is created as before and then printBoard is called recursively with the remaining digits. When there are no more, the if in line 2 fails and the recursion stops. Here's a sample run of each (though not solutions):

>>> import q_func
>>> q_func.printBoard('12345678')
Q . . . . . . .
. Q . . . . . .
. . Q . . . . .
. . . Q . . . .
. . . . Q . . .
. . . . . Q . .
. . . . . . Q .
. . . . . . . Q
>>> import q_imper
>>> q_imper.printBoard('87654321')
. . . . . . . Q
. . . . . . Q .
. . . . . Q . .
. . . . Q . . .
. . . Q . . . .
. . Q . . . . .
. Q . . . . . .
Q . . . . . . .
>>>

Checking whether a placement is valid

The central piece of the program decides if a queen may be placed on a given square (row and column) in harmony with all the other queens that have been placed before. In the diagram below, we work from the top down and then left to right. The '?' is where we are considering the placement of a queen that would extend our partial solution from 4 rows to 5. Every square with an x must be checked to see if it is empty or has been assigned to an earlier queen. A new queen may replace the ? only if all x squares are empty.

Q . x . . . x .
. . x Q . x . .
x Q x . x . . .
. x x x Q . . .
. . ? . . . . .

This is done in a single function checkPlacement which takes two parameters, a partial solution (here '1425') and a column number (here 3). It returns True if placement is possible. Here is the imperative version:

1  def checkPlacement (partial, col) :
2    row = len(partial)      # row we're adding
3    if partial :
4      spread = 1
5      for prow in range(row-1,-1,-1) :   # previous rows
6        if int(partial[prow]) in (col,col-spread,col+spread):
7          return False
8        spread += 1
9    return True

The for loop works from the bottom up to the top, checking if there is a queen in any of the three x columns. partial[prow] contains the column where the queen in row prow is found. col is the column of our ?. And col, col-spread, col+spread are where the three x's are. If any are occupied we're out of luck for placing a queen at '?' Notice that spread grows as we go up, tracking the diagonals. Of course, in the above example, col-spread will be off the board in rows 1 and 2 but that's not a problem since we're not indexing on these values. They are always out the range (1-8). Line 6 is a bit tricky. You may want to manually check it.

For comparision, here is the functional version:

1  def checkPlacement (partial, col, spread=1) :
2    if not partial : return True
3    else :
4      if int(partial[-1]) in (col,col-spread,col+spread):
5        return False
6      else :
7        return checkPlacement(partial[:-1], col, spread+1)

It's actually a bit shorter. The use of recursion is similar to the printBoard function. We are able to use the Python parameter default feature to handle both the initial and subsequent settings for spread.

Here, we'll play around with this. We have our four row partial solution and want to test queen placement for row 5 in columns 6 and 3.

>>> import q_imper, q_func
>>>
>>> q_imper.printBoard('1425')
Q . . . . . . .
. . . Q . . . .
. Q . . . . . .
. . . . Q . . .

>>> q_imper.checkPlacement('1425',3)
True
>>> q_imper.checkPlacement('1425',6)
False
>>> q_func.checkPlacement('1425',3)
True
>>> q_func.checkPlacement('1425',6)
False
>>>

Finding Solutions Imperatively

It's now a fairly short step to generating solutions. In the imperative version below,the program keeps a queue partials that holds all of the partial solutions found. Once a partial solution becomes a full solution, it is printed and discarded (line 7). Otherwise, the columns in the empty row are each checked (line 9) and if OK a new partial solution is created and added to the queue (line 11). Here is the complete function:

 1 def findSolutions() :
 2   partials = [""]    # just an empty chessboard
 3   while partials :
 4     partial = partials.pop(0)
 5     if len(partial) >= SIZE :
 6       solution = partial
 7       print partial # a solution
 8     else :
 9       for col in range(1,SIZE+1) :
10         if checkPlacement (partial, col) :
11           partials.append(partial+str(col))

Here is a sample run:

$ python q_imper.py
15863724
16837425
17468253
17582463
24683175
25713864
  (many more)

74286135
75316824
82417536
82531746
83162574
84136275
Done. Took 0.0495

You can see that the program took about 50 milliseconds to find the 92 solutions. There is a nice order in the display and if you look closely you'll see first solutions are mirror images of their counterparts at the end. Incidentally 2057 partial solutions were sent to queue for later processing.
Finding Solutions Functionally

We could take the above code for findSolutions and turn it into two recursive functions that would replace the while loop starting at line 3 and the for loop at line 9. But I would like to do something quite a bit more interesting.

Python has some built-in functions for list processing. Let's look at the four functions we'll use. The first 3 take a function and a list.

The function map applies the function (with one parameter) to each element of the list and returns a new list with the results. The original list is unchanged. The function may be either defined with def or a lamba expression. Here's some examples:

>>> map(lambda x: x+5,   [1,2,3,4,5])
[6, 7, 8, 9, 10]
>>> map(lambda x: [x+5],   [1,2,3,4,5])
[[6], [7], [8], [9], [10]]
>>>

The function reduce takes a function with two parameters and applies between the list elements to create a single value. We'll use def to define the function instead of lambda:

>>> def plus(x,y) : return x+y
>>> reduce (plus, [1,2,3,4,5])
15
>>> # when lists are "added" they are concatenated
>>> reduce (plus, [[2],[3],[4]])
[2, 3, 4]

The function filter takes a function of one argument and applys it to each element dropping those that evaluate to false (False, None, [], ""). The following filters out the odd numbers in the list:

>>> # remove non-even numbers
>>> filter (lambda x: x%2==0, [1,2,3,4,5,6])
[2, 4, 6]

Finally, the function zip works like a zipper. It takes two list and returns a list of tuples, marrying the elements together. An example is sufficient:

>>> zip([1,2,3,4],['one','two','three','four'])
[(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]

The function findSolutions in q_func.py will use a helper function expandSolution. Let's walk through what will be happening there. The string '1425' represents a partial solution that we'll want to expand:

>>> pairs = zip(['1425']*8, range(1,9))
>>> pairs
    [('1425', 1), ('1425', 2), ('1425', 3), ('1425', 4),
    ('1425', 5), ('1425', 6), ('1425', 7), ('1425', 8)]

>>> ok = filter(lambda p: q_func.checkPlacement(p[0],p[1]), pairs)
>>> ok
    [('1425', 3), ('1425', 8)]

>>> map   (lambda p: "%s%d"%p, ok)
    ['14253', '14258']

>>> q_func.expandSolution('1425')  # wraps the above together
    ['14253', '14258']

Here is the code for expandSolution:

1 def expandSolution(partial) :
2   if len(partial) >= SIZE :
3     print partial # a solution
4     return []
5   else :
6     pairs = zip([partial]*SIZE, range(1,SIZE+1))
7     pairs = filter(lambda p: checkPlacement(p[0],p[1]), pairs)
8     pairs = map   (lambda p: "%s%d"%p, pairs)
9     return pairs

The function basically replaces the if/else in lines 5-11 in the iterative version. The earlier for loop is replaced by the higher-order calls from zip/filter/map. The interactive dialog just above shows how a partial solution '1425' is transformed into its successor list ['14253','14258'].

Our functional findSolutions code is fairly simple and basically replaces the while loop in the iterative version:

1 def findSolutions(partials=[""]) :
2   if partials :
3     partials = map(expandSolution, partials)
4     partials = reduce(lambda x,y: x+y, partials)
5     findSolutions(partials)
6   return

initially, partials is the list [""] map (line 3) will change it to:

[ ["1"], ["2"], ["3"], ["4"], ["5"], ["6"], ["7"], ["8"] ]

and the reduce (line 4) will "add" (merge) this lists together to make:

["1", "2", "3", "4", "5", "6", "7", "8"]

giving us a good start on generating (partial) solutions (from our perspective) in parallel.

Running the program gives us the same output as the imperative version:

$ python q_func.py
15863724
16837425
17468253
17582463
24683175
25713864
25741863
  (many more)
74286135
75316824
82417536
82531746
83162574
84136275
Done. Took 0.0629


If we look at the possible ways we can place eight queens on the board with the only constraint being that only one queen may occupy a given square we get:

>>> 64*63*62*61*60*59*58*57*56
   9993927307714560

Another way to express this is "64!/55!" where "!" indicates factorial (and has precedence over the division). 9,993,927,307,714,560 is a big number and the computation would basically run forever. Bruce tweaked the program to jumpstart the search by adding a one queen per row condition. But it still took about 3 minutes to find all 92 solutions. Well over 1000 times as long as the two programs above. Why?

In our programs we do a breadth first tree search, but by generating partial solutions that can be eliminated along with all their descendents, we dramatically prune the tree as we go. This is similar to the knapsack problem discussed in the Dynamic Programming project.


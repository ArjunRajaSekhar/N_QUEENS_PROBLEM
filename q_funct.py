#  q_func.py
#
SIZE=8

def checkPlacement (partial, col, spread=1) :
  if not partial : return True
  else :
    if int(partial[-1]) in (col,col-spread,col+spread):
      return False
    else :
      return checkPlacement(partial[:-1], col, spread+1)

def printBoard(partial) :
  if partial :
    col = int(partial[0])
    lin = ". "*(col-1) + "Q " + \
          ". "*(SIZE-col)
    print (lin)
    printBoard(partial[1:])

def findSolutions(partials=[""]) :
  if partials :
    partials = map(expandSolution, partials)
    partials = reduce(lambda x,y: x+y, partials)
    findSolutions(partials)
  return

def expandSolution(partial) :
  if len(partial) >= SIZE :
    print (partial) # a solution
    return []
  else :
    pairs = zip([partial]*SIZE, range(1,SIZE+1))
    pairs = filter(lambda p: checkPlacement(p[0],p[1]), pairs)
    pairs = map   (lambda p: "%s%d"%p, pairs)
    return pairs
  
if __name__ == "__main__" :
  import time
  start = time.time()
  findSolutions()
  finish = time.time()
  print ("Done. Took %.4f" % (finish-start))


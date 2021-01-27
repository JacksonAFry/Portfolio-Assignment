/*Jackson Fry,
Jan 7, 2020,

Backbones of Conway's Game of Life

Data dictionary
***************************
    
  SETUP:  
    grid - 2d array, holds values to display as squares (1 =     white,   0 = black / invisible) 
  
    col - the number of coloumbs (determined by canvas width and res)
  
    row - the number of rows (determined by canvas height and res)
  
    res - how big each space on the grid will be
    
    colours - array of colours
    
  
  COUNTERS:
    i / x - counter for x values (for the array [i] [])
  
    j / y - counter for y values (for the array  [][j])
    
    neighbours - counter for "live" neighbours (live means a value of 1)

*****************************
*/

//setup


function make2DArray(col, row)
{
  let arrayBase = new Array(col);
  for (let i = 0; i < arrayBase.length; i++)
    {
        arrayBase[i] = new Array(row);
    }
  
  //returning array
  return arrayBase;
}


let grid;
let cols;
let rows;
let res = 10;

//colours
let colours = ['#ff0000','#ff00ff', '#00ff00', '#00ff00', '#ff00ff', '#ff0000', '#ff0000', '#ff0000', '#ff0000'];


function setup() {
  createCanvas(600, 600);
  cols = width / res;
  rows = height / res;
  
  //filling in grid with random values (0 or 1)
  grid = make2DArray (cols, rows);
  for(let i = 0; i < cols; i++)
    {
    for(let j = 0; j < rows; j++)
      {
        grid[i][j] = floor(random(2));
      }
    }
}



//running draw function to loop calculations and redraw screen
function draw() 
{
  background(0,0,0);
  
  //drawing squares
  
  //looping through the array
  for (let i = 0; i<cols; i++)
    {
      for(let j = 0; j< rows; j++)
      {
        //making each square
        if (grid[i][j] === 1)
          {

 
            //colour based on next state
            let neighbours = countNeighbours (grid, i, j);
            
            //colours
           fill(colours[neighbours]);          
            rect (i*res, j*res, res-1, res-1) ;
          }
          
      }   
    }
  
  
  //array used to update the grid's state after all calculations are finished
  //The reason no updates are applied directly to the main grid is because changing any aspect of   the main grid will throw off following calculations.
  let newState = make2DArray (cols, rows);
  
  
  
  //counting neighbors and applying new state
  //looping through array
  for (let i = 0; i<cols; i++)
    {
      for(let j = 0; j< rows; j++)
      {
        //count live neighbours
        let neighbours = countNeighbours (grid, i, j);
        
        if (grid[i][j] === 0 && neighbours === 3)
        {
          newState[i][j] = 1;
        }
        
        else if (grid[i][j] === 1 && (neighbours < 2 || neighbours >3))
        {
          newState[i][j] = 0;
        }
        
        else
        {
          newState[i][j] = grid[i][j];
        }
        
          
        
      }   
    }
    
  
  //set grid to newstate for next cycle
  grid = newState;
}





//neighbour count function
function countNeighbours (grid, x, y)
{
  //variable for counting live neighbors
  let neighbours = 0;
  
  //counting
  for (let i = -1; i<2; i++)
    {
      for(let j = -1; j< 2; j++)
      {
        
        //wrap around edges
        let col = (cols+ x + i) % cols;
        let row = (rows+ y + j) % rows;
        
        //adding value of array position
        //ADD I AND J VALUES TOO X AND Y TO GET THE CORRECT POSITIONS
        neighbours += grid[col][row];
        
        
      }
    }
  
  //subtracting current grid position as it does not count for 
  neighbours -= grid[x][y];
  
  return neighbours;
}

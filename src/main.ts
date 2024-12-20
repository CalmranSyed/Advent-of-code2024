import './style.css';

const list1 : Array<number> = [];
const list2 : Array<number> = [];

function getDistanceBetweenLists(listA : number[], listB : number[]) : number | undefined {
  if(listA.length !== listB.length) {
    console.error('length not same');
    return;
  }

  const listLength = listA.length;
  let result = 0;
  
  // loop over the sorted lists and store the differences between 2 numbers of the list in the result variable
  for (let index = 0; index < listLength; index++) {
    let temp = Math.abs(listA[index] - listB[index]);
    result += temp;
  }

  return result;
}

function getSimilarityScore(listA : number[], listB : number[]) : number {
  type FreqMap = {
    [key: string] : number
  }
  
  let frequencyMap : FreqMap = {};
  
  listA.forEach(el=>{
    if(!frequencyMap[el]) frequencyMap[el] = 0;
  });

  listB.forEach(el=> {
    if(frequencyMap.hasOwnProperty(el)) {
      frequencyMap[el]+=1;
    }
  });

  let buffer = 0; 
  listA.forEach(el=> {
    buffer += (el * frequencyMap[el])
  })
  
  return buffer;
}

try {
  const text = await fetch("../input.txt");
  const textData = await text.text();
  // get all the numbers from the text by splitting string from whitespaces and newlines
  const numbers = textData.split(/\s+/g).map(item=>parseInt(item));
  // add the numbers in either of the list by adding + 1 to index and by checking if even or odd;
  // odds go to list1 an even goes to list2
  numbers.forEach((number,index) => {
    if(!number) {
      return;
    }
  
    if((index+1)%2 !== 0) {
      list1.push(number);
    }
    
    if((index+1)%2 === 0) {
      list2.push(number);
    }
  });
  
  // sort the lists to arrange smallest values first
  list1.sort();
  list2.sort();
  
  const distanceBetweenLists = getDistanceBetweenLists(list1,list2);
  const similarityScore = getSimilarityScore(list1,list2);
  console.log("RESULT :",distanceBetweenLists);
  console.log("BUFFER: ",similarityScore);

}
catch(error) {
  console.error(error);
}
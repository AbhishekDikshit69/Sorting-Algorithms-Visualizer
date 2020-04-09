export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getBubbleSortAnimations(arr){
    const animations = [];
        const  n = arr.length; 
        for (let i = 0; i < n-1; i++) 
            for (let j = 0; j < n-i-1; j++) 
                if (arr[j] > arr[j+1]) 
                { 
                  animations.push([j,j+1]);
                  animations.push([j,j+1]);
                  animations.push([j,arr[j+1]]);
                    // swap arr[j+1] and arr[i] 
                    let temp = arr[j]; 
                    arr[j] = arr[j+1]; 
                    arr[j+1] = temp; 
                    
                  animations.push([j,j+1]);
                  animations.push([j,j+1]);
                  animations.push([j+1,temp]);
                }
          return animations; 
    }
  
    function partition(arr,low,high,quickanimations) 
    { 
        let pivot = arr[high];  
        let i = (low-1); // index of smaller element 
        for (let j=low; j<high; j++) 
        { 
            // If current element is smaller than the pivot 
            if (arr[j] < pivot) 
            { 
                i++; 
                quickanimations.push([i,j]);
                  quickanimations.push([j,i]);
                  quickanimations.push([i,arr[j]]);
                // swap arr[i] and arr[j] 
                let temp = arr[i]; 
                arr[i] = arr[j]; 
                arr[j] = temp; 
                quickanimations.push([i,j]);
                  quickanimations.push([j,i]);
                  quickanimations.push([j,temp]);
            } 
        } 
  
        // swap arr[i+1] and arr[high] (or pivot) 
                  quickanimations.push([i+1,high]);
                  quickanimations.push([high,i+1]);
                  quickanimations.push([i+1,arr[high]]);
        let temp = arr[i+1]; 
        arr[i+1] = arr[high]; 
        arr[high] = temp; 
                  quickanimations.push([i+1,high]);
                  quickanimations.push([high,i+1]);
                  quickanimations.push([high,temp]);
  
        return i+1; 
    } 
  
  
    /* The main function that implements QuickSort() 
      arr[] --> Array to be sorted, 
      low  --> Starting index, 
      high  --> Ending index */
    export function getQuickSortAnimations(arr,low ,high,quickanimations) 
    { 
        if (low < high) 
        { 
            /* pi is partitioning index, arr[pi] is  
              now at right place */
            let pi = partition(arr, low, high,quickanimations); 
  
            // Recursively sort elements before 
            // partition and after partition 
            getQuickSortAnimations(arr, low, pi-1,quickanimations); 
            getQuickSortAnimations(arr, pi+1, high,quickanimations); 
        } 
        return quickanimations;
    }
  export  function getHeapSortAnimations(arr) 
    { let animations=[];
        const n = arr.length; 
  
        // Build heap (rearrange array) 
        for (let i = n / 2 - 1; i >= 0; i--) 
            heapify(arr, n, i,animations); 
  
        // One by one extract an element from heap 
        for (let i=n-1; i>0; i--) 
        {    animations.push([0,i]);
          animations.push([i,0]);
          animations.push([0,arr[i]]);
            // Move current root to end 
            let temp = arr[0]; 
            arr[0] = arr[i]; 
            arr[i] = temp; 
            animations.push([0,i]);
          animations.push([i,0]);
          animations.push([i,temp]);
            // call max heapify on the reduced heap 
            heapify(arr, i, 0,animations); 
        } 
        console.log(animations);
        return animations;
    }   

    function heapify(arr,n,i,animations) 
    { 
        let largest = i; // Initialize largest as root 
        let l = 2*i + 1; // left = 2*i + 1 
        let r = 2*i + 2; // right = 2*i + 2 
  
        // If left child is larger than root 
        if (l < n && arr[l] > arr[largest]) 
            largest = l; 
  
        // If right child is larger than largest so far 
        if (r < n && arr[r] > arr[largest]) 
            largest = r; 
  
        // If largest is not root 
        if (largest !== i) 
        {   
          animations.push([largest,i]);
          animations.push([i,largest]);
          animations.push([i,arr[largest]]);
            let swap = arr[i]; 
            arr[i] = arr[largest]; 
            arr[largest] = swap; 
            animations.push([largest,i]);
          animations.push([i,largest]);
            animations.push([largest,swap]);
            // Recursively heapify the affected sub-tree 
            heapify(arr, n, largest,animations); 
        } 
    } 
   export function getInsertionSortAnimations(arr){ 
     let animations=[];
    const n = arr.length; 
    for (let i = 1; i < n; ++i) { 
        let key = arr[i]; 
        let j = i - 1; 

        /* Move elements of arr[0..i-1], that are 
           greater than key, to one position ahead 
           of their current position */
        while (j >= 0 && arr[j] > key) { 
          animations.push([j,j+1]);
          animations.push([j,j+1]);
          animations.push([j+1,arr[j]]);
            arr[j + 1] = arr[j]; 
            j = j - 1; 
        } 
        animations.push([j+1,i]);
          animations.push([i,j+1]);
          animations.push([j+1,key]);
        arr[j + 1] = key; 
    }
    return animations; 
} 
function heapSort(array){
    heapify(array)

    for(var i = 0; i < array.length - 1; i++){
        swap(array, 0, array.length - 1 - i)
        bubbleDown(array, 0, array.length - 1 - i)
    }
}

function heapify(array){
    for(var i = 1; i < array.length; i++){
        bubbleUp(array, i)
    }
}

function bubbleUp(array, i){//insert
    if(i == 0)return
    var pa = getParent(i)
    if(array[i] > array[pa]){
        swap(array, i, pa)
        bubbleUp(array, pa)
    }
}

function bubbleDown(array, i, length){//delete
    var bigChild = leftChild(i)
    if(bigChild >= length)return

    var rchild = rightChild(i);
    if(rchild < length && array[rchild] > array[bigChild])bigChild = rchild;

    if(array[i] > array[bigChild])return;//if current element is bigger and thus in the right spot, just return
    else swap(array, i, bigChild);
    bubbleDown(array, bigChild, length)
    
}

function getParent(i){
    return Math.floor((i - 1) / 2)
}

function leftChild(i){
    return i * 2 + 1
}

function rightChild(i){
    return i * 2 + 2
}

function bubbleSort(array){
	var swapped = true
	var toSort = array.length

	while(swapped){
		swapped = false
		for(var i = 1; i < toSort; i++){
			if(array[i - 1] > array[i]){
				swap(array,i - 1, i)
				swapped = true
			}
		}
		toSort--
	}
}

function insertionSort(array){
	for(var i = 1; i < array.length; i++){
		for(var j = i; j > 0; j--){
			if(array[j - 1] > array[j]){
				swap(array, j - 1, j)
			}else break;
		}
	}
}

function quikSort(array){
    quikSortPr(array,0,array.length - 1)
}

function quikSortPr(array, low, high){
    if(low >= high)return
    var pivot = array[Math.floor((low + high) / 2)]
    var wall = partition(array, low, high, pivot)
    quikSortPr(array, low, wall - 1)
    quikSortPr(array, wall, high)
}

function partition(array, low, high, pivot){
    var left = low;
    var right = high;

    while(left <= right){
        while(array[left] < pivot)left++
        while(array[right] > pivot)right--
        if(left <= right){
            swap(array, left, right)
            left++
            right--
        }
    }
    return left
}

function swap(array, a, b){
    var temp = array[a]
    array[a] = array[b]
    array[b] = temp
}

function _mergeSort(array){
	mergeSort(array, 0, array.length, [])
}

function mergeSort(array, from, to, temp){
	if(to - from < 2)return
	var middle = Math.floor((from + to) / 2)

	mergeSort(array, from, middle, temp)
	mergeSort(array, middle, to, temp)

	merge(array, from, middle, to, temp)
}

function merge(array,from,middle,end,scratch){
	var left = from
	var right = middle
	var index = left;

	while(left < middle && right < end){
		if(array[left] < array[right]){
			scratch[index] = array[left]
			left++
		}else{
			scratch[index] = array[right]
			right++
		}
		index++
	}

	copy(array, left, scratch, index, middle - left)
	copy(array, right, scratch, index, end - right)
	copy(scratch, from, array, from, end - from)

}

function copy(source, srcFrom, dest, destFrom, length){
	for(var i = srcFrom; i < srcFrom + length; i++)dest[destFrom++] = source[i]		
}
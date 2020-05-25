/**
 * 例：
[2, 6]、[1, 4]、[5, 8]
交集为：
[2, 4]、[5, 6]

注：
第一个解的意思是 [2, 6]、[1, 4]的区间为[2, 4]
第二个解的意思是 [2, 6]、[5, 8]的区间为[5, 6]
 */

 function intersection(list) {
     const data = []
    list.forEach((item, index) => {
        const iMax = Math.max(...item)
        const iMin = Math.min(...item)

        for(let j = index + 1; j < list.length; j++) {
            const jMax = Math.max(...list[j])
            const jMin = Math.min(...list[j])

            
            if (iMin <= jMax && jMax <= iMax && jMin <= iMin) {
                data.push([iMin, jMax])
            } else if (jMin <= iMax && iMax <= jMax && iMin <= jMin) {
                data.push([jMin, iMax])
            } else if (iMin >= jMin && iMin <= jMax && iMax <= jMax) {
                data.push([jMin, jMax])
            } else if (jMin >= iMin && jMin <= iMax && jMax <= iMax) {
                data.push([iMin, iMax])
            }
        }
    })

    return data;
 }

 console.log(intersection([[2, 6], [1, 4], [5,8]]))
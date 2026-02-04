# 내 풀이
def solution(array, height):
    answer = []
    for i in array:
        if array[i] > height:
            answer.append(i)
    return len(answer)

# 다른 풀이1
def solution1(array, height):
    return sum(1 for x in array if x > height)

# 다른 풀이2
def solution2(array, height):
    array.append(height)
    array.sort(reverse=True)
    return array.index(height)

# 다른 풀이3
def solution3(array, height):
    count = 0
    for x in array:
        if x > height:
            count += 1
    return count

# 내 풀이
def solution1(array, height):
    answer = []
    for i in array:
        if array[i] > height:
            answer.append(i)
    return len(answer)

# 다룬 사람 풀이
def solution2(array, height):
    array.append(height)
    array.sort(reverse=True)
    return array.index(height)

# GPT 풀이1
def solution3(array, height):
    count = 0
    for x in array:
        if x > height:
            count += 1
    return count

# GPT 풀이2
def solution4(array, height):
    return sum(1 for x in array if x > height)

###########################################################
### 03/09 Python 시험 13번 문제 '택배 배송 상태 관리 프로그램' ###
###########################################################


class Package:
    def __init__(self, track_number, receiver, status = '준비중'):
        self.track_numer = track_number
        self.receiver = receiver
        self.status = status

    def show_info(self):
        print(f'송장번호: {self.track_numer}, 받는 사람: {self.receiver}, 상태: {self.status}')

    def update_status(self, new_status:str):
        possible = ['준비중', '배송 중', '배송 완료']
        if new_status not in possible:
            print('잘못된 상태입니다.')
        else:
            self.status = new_status
            print(f'{self.track_numer} 상태가 \'{self.status}\'(으)로 변경되었습니다.')


print('송장 번호와 받는 사람을 입력하세요')
first_track_num = input('첫 번째 택배 송장번호: ')
first_receiver = input('받는 사람: ')
package1 = Package(first_track_num, first_receiver)

second_track_num = input('\n두 번째 택배 송장번호: ')
second_receiver = input('받는 사람: ')
package2 = Package(second_track_num, second_receiver)

print('--- 상태 변경 ---\n')
package1.update_status('배송 중')
package2.update_status('배송 완료')

print('\n--- 현재 택배 정보 ---\n')
print(f'송장번호: {package1.track_numer}, 받는 사람: {package1.receiver}, 상태: {package1.status}')
print(f'송장번호: {package2.track_numer}, 받는 사람: {package2.receiver}, 상태: {package2.status}')
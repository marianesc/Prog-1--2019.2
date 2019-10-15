sangue1 = input()
tipo1 = input()
sangue2 = input()
tipo2 = input()

if sangue1 == 'AB' and tipo1 == '+':
    print("compatível")

elif (sangue1 == 'A' and tipo1 == '+') and (sangue2 == 'A' or sangue2 == 'O'):
    print("compatível")

elif (sangue1 == 'A' and tipo1 == '-') and ((sangue2 == 'A' and tipo2 == '-') or (sangue2 == 'O' and tipo2== '-')):
    print("compatível")

elif (sangue1 == 'B' and tipo1 == '+') and (sangue2 == 'B' or sangue2 == 'O'):
    print("compatível")

elif (sangue1 == 'B' and tipo1 == '-') and ((sangue2 == 'B' and tipo2 == '-') or (sangue2 == 'O' and tipo2 == '-')):
    print("compatível")

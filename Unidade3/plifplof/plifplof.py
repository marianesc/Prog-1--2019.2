#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Plif Plof

num1 = int(input())
num2 = int(input())
num3 = int(input())

soma = num1 + num2 + num3
divi3 = soma % 3
divi5 = soma % 5

if divi3 == 0 and divi5 == 0:
    print("plifplof")
elif divi3 == 0:
    print("plif")
elif divi5 == 0:
    print("plof")
else:
    print(soma)

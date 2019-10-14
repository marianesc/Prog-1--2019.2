#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Telefonia

tempo = int(input())

preco1 = 1.00 + (tempo*0.5)
intervalo5 = (tempo) // 5
rintervalo5 = tempo-(intervalo5*5)
preco2 = 1+ ((intervalo5*3.00)+ (rintervalo5*0.70))

if tempo > 3 :
    print("R$ %.2f"%preco2)
else:
    print("R$ %.2f"%preco1)

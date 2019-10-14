#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Categorias

nome = input()
idade = int(input())

if  idade < 5:
    print("{0}, {1} anos, Não pode competir.".format(nome,idade))
elif  idade <= 7:
    print("{0}, {1} anos, Infantil A.".format(nome,idade))

elif 10> idade <= 10:
    print("{0}, {1} anos, Infantil B.".format(nome,idade))

elif 13> idade <= 13:
    print("{0}, {1} anos, Juvenil A.".format(nome,idade))

elif idade <= 17:
    print("{0}, {1} anos, Juvenil B.".format(nome,idade))

else:
    print("{0}, {1} anos, Senior.".format(nome,idade))

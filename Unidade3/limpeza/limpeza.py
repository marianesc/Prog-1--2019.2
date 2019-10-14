#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#Limpeza

opcao = int(input())
pfossa = 80
pagua = 50

if opcao == 3:
        print("R$ 50,00")
elif opcao == 1:
    fossa = float(input())
    valor = pfossa*fossa
    print("R$ %d,00"%valor)
    if valor >= 200:
        print("Brinde!")
elif opcao == 2:
    agua = float(input())
    valor = pagua*agua
    print("R$ %d,00"%valor)
    if valor >= 200:
        print("Brinde!")

#UFCG
#Programação 1 - 2019.2
#Juan Salvador da Silva -119210821
#IPTU Escolhendo Forma de Pagamento

area = float(input())
valor = float(input())
opcao = input()
preco = area*valor

if opcao == 'vista':
    preco = preco - (preco * 0.20)
    print("Total: R$ {0:.2f}".format(preco))
elif opcao == '2x':
    preco = preco - (preco * 0.10)
    parcelas = preco/2
    print("Total: R$ {0:.2f}. Parcelas: R$ {1:.2f}".format(preco,parcelas))
elif opcao == '3x':
    preco = preco - (preco * 0.05)
    parcelas = preco/3
    print("Total: R$ {0:.2f}. Parcelas: R$ {1:.2f}".format(preco,parcelas))

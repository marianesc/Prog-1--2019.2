# UFCG - Programação 1 - 2019.2
# André Lucas Medeiros Martins- 119210592

# IPTU Escolha

area = float(input())
valorMetro = float(input())
pagamento = input().upper()

total=area*valorMetro

if pagamento == "VISTA":
    total -= total*0.20
    print("Total: R$ {:.2f}".format(total))

elif pagamento == "2X":
    total -= total*0.10
    parcela = total/2
    print("Total: R$ {:.2f}. Parcelas: R$ {:.2f}".format(total, parcela))

elif pagamento == "3X":
    total -= total*0.05
    parcela = total/3
    print("Total: R$ {:.2f}. Parcelas: R$ {:.2f}".format(total, parcela))


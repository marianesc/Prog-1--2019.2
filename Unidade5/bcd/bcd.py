#ufcg
#juan silva- 119210821
#bcd

while True:
    par1 = ''
    parinvertido = ''
    par2 = ''
    bcdinv = 'BCD inválido.'
    valorbcd = []
    bcd = input()
    if bcd == 'fim':
        break
    for i in range((len(bcd)/2)):
        par1 += bcd[i]
    for e in range((len(bcd)/2)-1,-1,-1):
        parinvertido += bcd[e]
    for j in range(len(parinvertido)-1,-1,-1):
        par2 += parinvertido
    parvalido = par1 + par2
    if len(bcd) != 8:
        valobcd.append(bcdinv)
    else:
        valorbcd.append(int(parvalido,2))
for k in range(len(valorbcd)):
    print(valorbcd[k])


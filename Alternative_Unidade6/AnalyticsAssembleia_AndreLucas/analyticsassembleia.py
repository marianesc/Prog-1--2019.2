# UFCG - Programação 1 - 2019.2
# André Lucas Mederios Martins - 119210592
# Analytics Assembleia

def conta_votos(votos, ID):
    resultado = [0,0]
    for voto in votos:
        voto = voto.split(',')
        if int(voto[2])  == ID:
            if voto[1] == 'sim':
                resultado[0] += 1
            else:
                resultado[1] += 1
    return resultado
'''
votacao = []
votacao.append('greve geral,sim,543,joao,servidor')
votacao.append('greve geral,nao,543,marina,servidor')
votacao.append('indicativo de greve,sim,5,joao,professor')
votacao.append('paralisação,nao,543,julio,professor')
votacao.append('paralisação,sim,543,carlos,professor')
votacao.append('paralisação,sim,543,juliana,professor')
votacao.append('lei 1329,sim,99,joao,servidor')

print(conta_votos(votacao, 543))
'''

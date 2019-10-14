# Davi Sousa

def move_direita(lab):

    nl = len(lab)
    nc = len(lab[0])

    def get_pos(lab):
        for i in range(nl):
            for j in range(nc):
                e = lab[i][j]
                if e == '*':
                    return (i, j)

    pos = get_pos(lab)
    i, j = pos

    if j == nc - 1 or lab[i][j + 1] == 'P':
        return pos
    else:
        for i in range(nl):
            for j in range(nc):
                if i == pos[0] and j == pos[1]:
                    lab[i][j] = ' '
                elif i == pos[0] and j == pos[1] + 1:
                    lab[i][j] = '*'
        return (pos[0], pos[1]+1)

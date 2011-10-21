function Node(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck,tip_id,tip_title,tip_content) {
    this.id = id;
    this.pid = pid;
    this.name = name;
    this.url = url;
    this.value = value;
    this.title = title;
    this.descrip = descrip;
    this.target = target;
    this.icon = icon;
    this.iconOpen = iconOpen;
    this.tip_id = tip_id;
    this.tip_title = tip_title;
    this.tip_content = tip_content;
    this._io = open || false;
    this._ic = icheck || false;
    this._is = false;
    this._ls = false;
    this._hc = false;
    this._ai = 0;
    this._p
};
function dTree(objName, formId, tipstitle, getStyleId,rootValue) {
    this.config = {
        target: null,
        folderLinks: true,
        useSelection: true,
        useCookies: true,
        useLines: true,
        useIcons: false,
        useCheckBox: true,
        useRelationParent: false,
        useShowTips: false,
        useStatusText: false,
        closeSameLevel: false,
        inOrder: false
    };
    this.icon = {
        root: 'images/dtree/root.gif',
        folder: 'images/dtree/folder.gif',
        folderOpen: 'images/dtree/folderopen.gif',
        node: 'images/dtree/node.gif',
        empty: 'images/dtree/empty.gif',
        line: 'images/dtree/line.gif',
        join: 'images/dtree/join.gif',
        joinBottom: 'images/dtree/joinbottom.gif',
        plus: 'images/dtree/plus.gif',
        plusBottom: 'images/dtree/plusbottom.gif',
        minus: 'images/dtree/minus.gif',
        minusBottom: 'images/dtree/minusbottom.gif',
        nlPlus: 'images/dtree/nolines_plus.gif',
        nlMinus: 'images/dtree/nolines_minus.gif'
    };
    this.parEnum = objName;
    this.obj = objName;
    this.aNodes = [];
    this.aIndent = [];
    this.root = new Node(rootValue);
    this.selectedNode = null;
    this.selectedFound = false;
    this.completed = false;
    this.formId = (formId == null) ? "dTreeForm" : formId;
    this.pltstitle = tipstitle;
    this.dtreeStyleId = getStyleId
};
//dTree.prototype.add = function(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck) {
//    this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck)
//};
dTree.prototype.add = function(id, pid, name, url, value,tip_id,tip_title,tip_content,open) {
    this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, value, "", "", "", "", "", open, "",tip_id,tip_title,tip_content)
};
dTree.prototype.openAll = function() {
    this.oAll(true)
};
dTree.prototype.closeAll = function() {
    this.oAll(false)
};
dTree.prototype.toString = function() {
    var str = '<div class="' + this.dtreeStyleId + '" id="' + this.formId + '">\n';
    if (document.getElementById) {
        if (this.config.useCookies) this.selectedNode = this.getSelected();
        str += this.addNode(this.root)
    } else str += 'Browser not supported.';
    str += '</div>';
    if (!this.selectedFound) this.selectedNode = null;
    this.completed = true;
    return str
};
dTree.prototype.addNode = function(pNode) {
    var str = '';
    var n = 0;
    if (this.config.inOrder) n = pNode._ai;
    for (n; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == pNode.id) {
            if (this.aNodes[n].pid == 0) {
                this.parEnum = this.obj
            }
            var cn = this.aNodes[n];
            cn._p = pNode;
            cn._ai = n;
            this.setCS(cn);
            if (!cn.target && this.config.target) cn.target = this.config.target;
            if (cn._hc && !cn._io && this.config.useCookies) cn._io = this.isOpen(cn.id);
            if (!this.config.folderLinks && cn._hc) cn.url = null;
            if (this.config.useSelection && cn.id == this.selectedNode && !this.selectedFound) {
                cn._is = true;
                this.selectedNode = n;
                this.selectedFound = true
            }
            str += this.node(cn, n);
            if (cn._ls) break
        }
    }
    return str
};
dTree.prototype.node = function(node, nodeId) {
	if(node.pid==this.root.id){//不显示根节点
    var str = '<div class="dTreeNode dtreeroot">' + this.indent(node, nodeId);
  }else{
  	var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
  }
    if (this.config.useIcons) {
        if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);
        if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;
        if (this.root.id == node.pid) {
            node.icon = this.icon.root;
            node.iconOpen = this.icon.root
        }
        
        str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" class="icon" />'
    }
    if (this.config.useCheckBox && nodeId != 0) {
        if (node.pid == 0) {
            this.parEnum += node.id + "-"
        } else {
            var pL = this.parEnum.indexOf(node.pid + "-");
            this.parEnum = this.parEnum.substring(0, pL + (node.pid + "-").length) + node.id + "-"
        }
        if (node._ic) {
            str += '<input type="checkbox" checked="checked" name="id" id="c' + this.parEnum + '" title="' + node.name + '" onClick="' + this.formId.replace("tree_", "") + '.caBox(\'c' + this.parEnum + '\')" value="' + node.value + '" class="cx"/>'
        } else {
            str += '<input type="checkbox"  name="id" id="c' + this.parEnum + '" title="' + node.name + '" onClick="' + this.formId.replace("tree_", "") + '.caBox(\'c' + this.parEnum + '\')" value="' + node.value + '" class="cx"/>'
        }
    }

    if (node.url) {
        str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
        if (node.title) str += ' title="' + node.title + '"';
        if (node.target) str += ' target="' + node.target + '"';
        if (this.config.useShowTips) str += ' onmouseover="pltsshow(\'' + node.descrip + '\',\'' + this.pltstitle + '\',event);" onmousemove="pltsmove(event)" onmouseout="pltsout()" ';
        if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)) str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
        str += '>'
    } else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id) {
        str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"  class="node">';
    }
    str += node.name;
    
    if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
    
    if(node.tip_title!=''){str +=' <a href="#" onclick="return keepTooltip(\''+node.tip_id+'\', \''+node.tip_title+'\', \''+node.tip_content+'\', event)"><img src="images/tooltip/info-gray.gif" class="icon"/></a>';}
    
    str += '</div>';
    if (node._hc) {
        str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
        str += this.addNode(node);
        str += '</div>'
    }
    this.aIndent.pop();
    return str
};
dTree.prototype.indent = function(node, nodeId) {
    var str = '';
    if (this.root.id != node.pid) {
        for (var n = 0; n < this.aIndent.length; n++) str += '<img src="' + ((this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty) + '" alt="" />'; (node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
        if (node._hc) {
            str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
            if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
            else str += ((node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus));
            str += '" alt="" /></a>'
        } else str += '<img src="' + ((this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join) : this.icon.empty) + '" alt="" />'
    }
    return str
};
dTree.prototype.setCS = function(node) {
    var lastId;
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id) node._hc = true;
        if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id
    }
    if (lastId == node.id) node._ls = true
};
dTree.prototype.getSelected = function() {
    var sn = this.getCookie('cs' + this.obj);
    return (sn) ? sn : null
};
dTree.prototype.s = function(id) {
    if (!this.config.useSelection) return;
    var cn = this.aNodes[id];
    if (cn._hc && !this.config.folderLinks) return;
    if (this.selectedNode != id) {
        if (this.selectedNode || this.selectedNode == 0) {
            eOld = document.getElementById("s" + this.obj + this.selectedNode);
            eOld.className = "node";
        }
        eNew = document.getElementById("s" + this.obj + id);
        eNew.className = "nodeSel";
        this.selectedNode = id;
        if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
    }
};
dTree.prototype.o = function(id) {
    var cn = this.aNodes[id];
    this.nodeStatus(!cn._io, id, cn._ls);
    cn._io = !cn._io;
    if (this.config.closeSameLevel) this.closeLevel(cn);
    if (this.config.useCookies) this.updateCookie();
};
dTree.prototype.oAll = function(status) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
            this.nodeStatus(status, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = status;
        }
    }
    if (this.config.useCookies) this.updateCookie();
};
dTree.prototype.openTo = function(nId, bSelect, bFirst) {
    if (!bFirst) {
        for (var n = 0; n < this.aNodes.length; n++) {
            if (this.aNodes[n].id == nId) {
                nId = n;
                break;
            }
        }
    }
    var cn = this.aNodes[nId];
    if (cn.pid == this.root.id || !cn._p) return;
    cn._io = true;
    cn._is = bSelect;
    if (this.completed && cn._hc) this.nodeStatus(true, cn._ai, cn._ls);
    if (this.completed && bSelect) this.s(cn._ai);
    else if (bSelect) this._sn = cn._ai;
    this.openTo(cn._p._ai, false, true)
};
dTree.prototype.closeLevel = function(node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
            this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n])
        }
    }
}
dTree.prototype.closeAllChildren = function(node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
            if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n])
        }
    }
}
dTree.prototype.nodeStatus = function(status, id, bottom) {
    eDiv = document.getElementById('d' + this.obj + id);
    eJoin = document.getElementById('j' + this.obj + id);
    if (this.config.useIcons) {
        eIcon = document.getElementById('i' + this.obj + id);
        eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon
    }
    eJoin.src = (this.config.useLines) ? ((status) ? ((bottom) ? this.icon.minusBottom : this.icon.minus) : ((bottom) ? this.icon.plusBottom : this.icon.plus)) : ((status) ? this.icon.nlMinus : this.icon.nlPlus);
    eDiv.style.display = (status) ? 'block' : 'none'
};
dTree.prototype.clearCookie = function() {
    var now = new Date();
    var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    this.setCookie('co' + this.obj, 'cookieValue', yesterday);
    this.setCookie('cs' + this.obj, 'cookieValue', yesterday)
};
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
    document.cookie = escape(cookieName) + '=' + escape(cookieValue) + (expires ? '; expires=' + expires.toGMTString() : '') + (path ? '; path=' + path : '') + (domain ? '; domain=' + domain : '') + (secure ? '; secure' : '')
};
dTree.prototype.getCookie = function(cookieName) {
    var cookieValue = '';
    var posName = document.cookie.indexOf(escape(cookieName) + '=');
    if (posName != -1) {
        var posValue = posName + (escape(cookieName) + '=').length;
        var endPos = document.cookie.indexOf(';', posValue);
        if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
        else cookieValue = unescape(document.cookie.substring(posValue))
    }
    return (cookieValue)
};
dTree.prototype.updateCookie = function() {
    var str = '';
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
            if (str) str += '.';
            str += this.aNodes[n].id
        }
    }
    this.setCookie('co' + this.obj, str)
};
dTree.prototype.isOpen = function(id) {
    var aOpen = this.getCookie('co' + this.obj).split('.');
    for (var n = 0; n < aOpen.length; n++) if (aOpen[n] == id) return true;
    return false
};
if (!Array.prototype.push) {
    Array.prototype.push = function array_push() {
        for (var i = 0; i < arguments.length; i++) this[this.length] = arguments[i];
        return this.length
    }
};
if (!Array.prototype.pop) {
    Array.prototype.pop = function array_pop() {
        lastElement = this[this.length - 1];
        this.length = Math.max(this.length - 1, 0);
        return lastElement
    }
};
dTree.prototype.caBox = function(regx) {
    var form = document.getElementById(this.formId);
    if (document.getElementById(regx).checked) {
        var checkBoxs = form.getElementsByTagName('input');
        var regxArray = regx.split("-");
        for (var i = 0; i < checkBoxs.length; i++) {
            var element = checkBoxs[i];
            if (element.name == "id" && element.type == 'checkbox') {
                if (element.id.indexOf(regx) != -1) {
                    element.checked = true
                }
            }
        }
        if (this.config.useRelationParent) {
            var pDiv = "";
            for (j = 0; j < regxArray.length; j++) {
                pDiv += regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 1] + "-")) + ","
            }
            if (pDiv != "") {
                for (var i = 0; i < checkBoxs.length; i++) {
                    var element = checkBoxs[i];
                    if (element.name == "id" && element.type == 'checkbox') {
                        if (pDiv.indexOf(element.id + ",") != -1) {
                            element.checked = true
                        }
                    }
                }
            }
        }
    } else {
        var checkBoxs = form.getElementsByTagName('input');
        var regxArray = regx.split("-");
        for (var i = 0; i < checkBoxs.length; i++) {
            var element = checkBoxs[i];
            if (element.name == "id" && element.type == 'checkbox') {
                if (element.id.indexOf(regx) != -1) {
                    element.checked = false
                }
            }
        }
        if (this.config.useRelationParent) {
            var pDiv = "";
            for (j = 0; j < regxArray.length - 1; j++) {
                if (!this.isCheckedByRec(form, regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 2] + "-")))) {
                    pDiv = regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 2] + "-")) + ","
                }
            }
            if (pDiv != "") {
                for (var i = 0; i < checkBoxs.length; i++) {
                    var element = checkBoxs[i];
                    if (element.name == "id" && element.type == 'checkbox') {
                        if (pDiv.indexOf(element.id + ",") != -1) {
                            element.checked = false
                        }
                    }
                }
            }
        }
    }
}
dTree.prototype.isCheckedByRec = function(form, regx) {
    var checkBoxs = form.getElementsByTagName('input');
    for (var i = 0; i < checkBoxs.length; i++) {
        var element = checkBoxs[i];
        if (element.name == "id" && element.type == 'checkbox') {
            if (element.id.indexOf(regx) != -1 && element.checked && element.id != regx) {
                return true
            }
        }
    }
    return false
}
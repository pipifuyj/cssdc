/*--------------------------------------------------|
| dTree 2.05 | www.destroydrop.com/javascript/tree/ |
| Copyright (c) 2002-2003 Geir Landrö               |
| This script can be used freely as long as all     |
| copyright messages are intact.                    |
|                                                   |
| Updated: 17.04.2003                               |
|--------------------------------------------------*/

//树的节点
function Node(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck) {
    this.id = id; //ID
    this.pid = pid; //上级ID
    this.name = name; //名称
    this.url = url; //URL
    this.value = value; //值
    this.title = title; //节点标题
    this.descrip = descrip; //节点描述
    this.target = target; //URL跳转目标
    this.icon = icon; //节点图标
    this.iconOpen = iconOpen; //打开时图标
    this._io = open || false; //节点打开状态
    this._ic = icheck || false; //是否选中:CheckBox
    this._is = false;
    this._ls = false;
    this._hc = false; //是否包含下级
    this._ai = 0;
    this._p;
};

// Tree object
function dTree(objName, formId, tipstitle, getStyleId) {
    this.config = {
        target: null, //URL跳转目标
        folderLinks: true, //文件夹节点是否有链接
        useSelection: true, //是否支持选中节点
        useCookies: true, //是否使用cookie
        useLines: true, //是否显示连接线
        useIcons: false, //是否使用图标
        useCheckBox: true, //是否显示CheckBox
        useRelationParent: false, //是否关联上级，选中下级，上级同时选中
        useShowTips: false, //鼠标在节点时是否显示提示信息
        useStatusText: false,
        closeSameLevel: false,
        inOrder: false//是否排序
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
    this.aNodes = []; //所有节点集合
    this.aIndent = [];
    this.root = new Node(-1); //root节点
    this.selectedNode = null;
    this.selectedFound = false;
    this.completed = false;
    this.formId = (formId == null) ? "dTreeForm" : formId;
    this.pltstitle = tipstitle;
    this.dtreeStyleId = getStyleId;
};

//添加节点
dTree.prototype.add = function(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck) {
    this.aNodes[this.aNodes.length] = new Node(id, pid, name, url, value, title, descrip, target, icon, iconOpen, open, icheck);
};

//打开所有节点
dTree.prototype.openAll = function() {
    this.oAll(true);
};

//闭合所有节点
dTree.prototype.closeAll = function() {
    this.oAll(false);
};

//输出dTree
dTree.prototype.toString = function() {
    var str = '<div class="' + this.dtreeStyleId + '" id="' + this.formId + '">\n';
    if (document.getElementById) {
        if (this.config.useCookies) this.selectedNode = this.getSelected();
        str += this.addNode(this.root);
    } else str += 'Browser not supported.';
    str += '</div>';

    if (!this.selectedFound) this.selectedNode = null;
    this.completed = true;
    return str;
};

// Creates the tree structure
dTree.prototype.addNode = function(pNode) {
    var str = '';
    var n = 0;
    if (this.config.inOrder) n = pNode._ai;
    for (n; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == pNode.id) {
            if (this.aNodes[n].pid == 0) {
                //this.parEnum ="";
                this.parEnum = this.obj;
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
                this.selectedFound = true;
            }
            //            if (pNode._ic) {
            //                cn._ic = true;
            //            }
            str += this.node(cn, n);
            if (cn._ls) break;
        }
    }
    return str;
};

// Creates the node icon, url and text
dTree.prototype.node = function(node, nodeId) {

    var str = '<div class="dTreeNode">' + this.indent(node, nodeId);
    if (this.config.useIcons) {//如果使用图标

        //if(节点未指定图标)
        //{ 
        //  if(root.id==node.pid)
        //  {节点图标=最上级图标}
        //  else{
        //    if(包含下级){节点图标=统一文件夹图标}else{节点图标=统一节点图标}
        //  }
        //}
        if (!node.icon) node.icon = (this.root.id == node.pid) ? this.icon.root : ((node._hc) ? this.icon.folder : this.icon.node);

        //        if (节点没有打开的图标) {
        //            节点打开的图标=(if(节点包含子节点){文件夹打开图标}else{统一节点图标})
        //        }
        if (!node.iconOpen) node.iconOpen = (node._hc) ? this.icon.folderOpen : this.icon.node;

        //如果节点的上级节点值为root节点的值，这节点为根节点
        if (this.root.id == node.pid) {
            node.icon = this.icon.root;
            node.iconOpen = this.icon.root;
        }

        str += '<img id="i' + this.obj + nodeId + '" src="' + ((node._io) ? node.iconOpen : node.icon) + '" alt="" class="icon" />';
    }

    if (this.config.useCheckBox && nodeId != 0) {

        if (node.pid == 0) {
            this.parEnum += node.id + "-";
        }
        else {
            var pL = this.parEnum.indexOf(node.pid + "-");
            this.parEnum = this.parEnum.substring(0, pL + (node.pid + "-").length) + node.id + "-";
        }

        if (node._ic) {
            str += '<input type="checkbox" checked="checked" name="id" id="c' + this.parEnum + '" title="' + node.name + '" onClick="' + this.formId.replace("tree_", "") + '.caBox(\'c' + this.parEnum + '\')" value="' + node.value + '" class="cx"/>';
        } else {
            str += '<input type="checkbox"  name="id" id="c' + this.parEnum + '" title="' + node.name + '" onClick="' + this.formId.replace("tree_", "") + '.caBox(\'c' + this.parEnum + '\')" value="' + node.value + '" class="cx"/>';
        }
    }

    if (node.url) {
        str += '<a id="s' + this.obj + nodeId + '" class="' + ((this.config.useSelection) ? ((node._is ? 'nodeSel' : 'node')) : 'node') + '" href="' + node.url + '"';
        if (node.title) str += ' title="' + node.title + '"';
        if (node.target) str += ' target="' + node.target + '"';
        //if (this.config.useStatusText) str += ' onmouseover="window.status=\'' + node.name + '\';return true;" onmouseout="window.status=\'\';return true;" ';

        if (this.config.useShowTips) str += ' onmouseover="pltsshow(\'' + node.descrip + '\',\'' + this.pltstitle + '\',event);" onmousemove="pltsmove(event)" onmouseout="pltsout()" ';

        if (this.config.useSelection && ((node._hc && this.config.folderLinks) || !node._hc)) str += ' onclick="javascript: ' + this.obj + '.s(' + nodeId + ');"';
        str += '>';
    }
    else if ((!this.config.folderLinks || !node.url) && node._hc && node.pid != this.root.id) {
    str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"  class="node">';
    }
    str += node.name;
    if (node.url || ((!this.config.folderLinks || !node.url) && node._hc)) str += '</a>';
    str += '</div>';
    if (node._hc) {
        str += '<div id="d' + this.obj + nodeId + '" class="clip" style="display:' + ((this.root.id == node.pid || node._io) ? 'block' : 'none') + ';">';
        str += this.addNode(node);
        str += '</div>';
    }
    this.aIndent.pop();
    return str;
};

// Adds the empty and line icons
dTree.prototype.indent = function(node, nodeId) {
    var str = '';
    if (this.root.id != node.pid) {
        for (var n = 0; n < this.aIndent.length; n++)
            str += '<img src="' + ((this.aIndent[n] == 1 && this.config.useLines) ? this.icon.line : this.icon.empty) + '" alt="" />';
        (node._ls) ? this.aIndent.push(0) : this.aIndent.push(1);
        if (node._hc) {
            str += '<a href="javascript: ' + this.obj + '.o(' + nodeId + ');"><img id="j' + this.obj + nodeId + '" src="';
            if (!this.config.useLines) str += (node._io) ? this.icon.nlMinus : this.icon.nlPlus;
            else str += ((node._io) ? ((node._ls && this.config.useLines) ? this.icon.minusBottom : this.icon.minus) : ((node._ls && this.config.useLines) ? this.icon.plusBottom : this.icon.plus));
            str += '" alt="" /></a>';
        } else str += '<img src="' + ((this.config.useLines) ? ((node._ls) ? this.icon.joinBottom : this.icon.join) : this.icon.empty) + '" alt="" />';
    }

    return str;
};

// Checks if a node has any children and if it is the last sibling
dTree.prototype.setCS = function(node) {
    var lastId;
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id) node._hc = true;
        if (this.aNodes[n].pid == node.pid) lastId = this.aNodes[n].id;
    }
    if (lastId == node.id) node._ls = true;
};

// Returns the selected node
dTree.prototype.getSelected = function() {
    var sn = this.getCookie('cs' + this.obj);
    return (sn) ? sn : null;
};

// Highlights the selected node
dTree.prototype.s = function(id) {
    if (!this.config.useSelection) return;
    var cn = this.aNodes[id];
    if (cn._hc && !this.config.folderLinks) return;
    if (this.selectedNode != id) {
        if (this.selectedNode || this.selectedNode == 0) {
            var eOld = document.getElementById("s" + this.obj + this.selectedNode);
            eOld.className = "node";
        }
        eNew = document.getElementById("s" + this.obj + id);
        eNew.className = "nodeSel";
        this.selectedNode = id;
        if (this.config.useCookies) this.setCookie('cs' + this.obj, cn.id);
    }
};

// Toggle Open or close
dTree.prototype.o = function(id) {
    var cn = this.aNodes[id];
    this.nodeStatus(!cn._io, id, cn._ls);
    cn._io = !cn._io;
    if (this.config.closeSameLevel) this.closeLevel(cn);
    if (this.config.useCookies) this.updateCookie();
};

// Open or close all nodes
dTree.prototype.oAll = function(status) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._hc && this.aNodes[n].pid != this.root.id) {
            this.nodeStatus(status, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = status;
        }
    }
    if (this.config.useCookies) this.updateCookie();
};

// Opens the tree to a specific node
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
    this.openTo(cn._p._ai, false, true);
};

// Closes all nodes on the same level as certain node
dTree.prototype.closeLevel = function(node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.pid && this.aNodes[n].id != node.id && this.aNodes[n]._hc) {
            this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Closes all children of a node
dTree.prototype.closeAllChildren = function(node) {
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n].pid == node.id && this.aNodes[n]._hc) {
            if (this.aNodes[n]._io) this.nodeStatus(false, n, this.aNodes[n]._ls);
            this.aNodes[n]._io = false;
            this.closeAllChildren(this.aNodes[n]);
        }
    }
}

// Change the status of a node(open or closed)
dTree.prototype.nodeStatus = function(status, id, bottom) {
    eDiv = document.getElementById('d' + this.obj + id);
    eJoin = document.getElementById('j' + this.obj + id);
    if (this.config.useIcons) {
        eIcon = document.getElementById('i' + this.obj + id);
        eIcon.src = (status) ? this.aNodes[id].iconOpen : this.aNodes[id].icon;
    }
    eJoin.src = (this.config.useLines) ?
	((status) ? ((bottom) ? this.icon.minusBottom : this.icon.minus) : ((bottom) ? this.icon.plusBottom : this.icon.plus)) :
	((status) ? this.icon.nlMinus : this.icon.nlPlus);
    eDiv.style.display = (status) ? 'block' : 'none';
};


// [Cookie] Clears a cookie
dTree.prototype.clearCookie = function() {
    var now = new Date();
    var yesterday = new Date(now.getTime() - 1000 * 60 * 60 * 24);
    this.setCookie('co' + this.obj, 'cookieValue', yesterday);
    this.setCookie('cs' + this.obj, 'cookieValue', yesterday);
};

// [Cookie] Sets value in a cookie
dTree.prototype.setCookie = function(cookieName, cookieValue, expires, path, domain, secure) {
    document.cookie =
		escape(cookieName) + '=' + escape(cookieValue)
		+ (expires ? '; expires=' + expires.toGMTString() : '')
		+ (path ? '; path=' + path : '')
		+ (domain ? '; domain=' + domain : '')
		+ (secure ? '; secure' : '');
};

// [Cookie] Gets a value from a cookie
dTree.prototype.getCookie = function(cookieName) {
    var cookieValue = '';
    var posName = document.cookie.indexOf(escape(cookieName) + '=');
    if (posName != -1) {
        var posValue = posName + (escape(cookieName) + '=').length;
        var endPos = document.cookie.indexOf(';', posValue);
        if (endPos != -1) cookieValue = unescape(document.cookie.substring(posValue, endPos));
        else cookieValue = unescape(document.cookie.substring(posValue));
    }
    return (cookieValue);
};

// [Cookie] Returns ids of open nodes as a string
dTree.prototype.updateCookie = function() {
    var str = '';
    for (var n = 0; n < this.aNodes.length; n++) {
        if (this.aNodes[n]._io && this.aNodes[n].pid != this.root.id) {
            if (str) str += '.';
            str += this.aNodes[n].id;
        }
    }
    this.setCookie('co' + this.obj, str);
};

// [Cookie] Checks if a node id is in a cookie
dTree.prototype.isOpen = function(id) {
    var aOpen = this.getCookie('co' + this.obj).split('.');
    for (var n = 0; n < aOpen.length; n++)
        if (aOpen[n] == id) return true;
    return false;
};

// If Push and pop is not implemented by the browser
if (!Array.prototype.push) {
    Array.prototype.push = function array_push() {
        for (var i = 0; i < arguments.length; i++)
            this[this.length] = arguments[i];
        return this.length;
    }
};
if (!Array.prototype.pop) {
    Array.prototype.pop = function array_pop() {
        lastElement = this[this.length - 1];
        this.length = Math.max(this.length - 1, 0);
        return lastElement;
    }
};

/* checkbox tree */
dTree.prototype.caBox = function(regx) {
    var form = document.getElementById(this.formId);
    if (document.getElementById(regx).checked) {
        var checkBoxs = form.getElementsByTagName('input');
        var regxArray = regx.split("-");
        for (var i = 0; i < checkBoxs.length; i++) {
            var element = checkBoxs[i];
            if (element.name == "id" && element.type == 'checkbox') {
                // checked next node 
                if (element.id.indexOf(regx) != -1) {
                    element.checked = true;
                }

            }
        }

        // checked prev node
        if (this.config.useRelationParent) {
            var pDiv = "";
            for (j = 0; j < regxArray.length; j++) {
                //var pDiv = regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 1] + "-"));
                //if(form.getElementById(pDiv))
                //  form.getElementById(pDiv).checked=true;
                pDiv += regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 1] + "-")) + ",";
            }

            if (pDiv != "") {
                for (var i = 0; i < checkBoxs.length; i++) {
                    var element = checkBoxs[i];
                    if (element.name == "id" && element.type == 'checkbox') {
                        if (pDiv.indexOf(element.id + ",") != -1) {
                            element.checked = true;
                        }
                    }
                }
            }
        }
    }
    else {
        // unChecked
        var checkBoxs = form.getElementsByTagName('input');
        var regxArray = regx.split("-");
        for (var i = 0; i < checkBoxs.length; i++) {
            var element = checkBoxs[i];
            if (element.name == "id" && element.type == 'checkbox') {
                if (element.id.indexOf(regx) != -1) {
                    element.checked = false;
                }
            }
        }

        // checked prev node
        if (this.config.useRelationParent) {
            var pDiv = "";
            for (j = 0; j < regxArray.length - 1; j++) {
                if (!this.isCheckedByRec(form, regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 2] + "-")))) {
                    //var pDiv = regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 2] + "-"));
                    //if (form.getElementById(pDiv))
                    //  form.getElementById(pDiv).checked = false;
                    pDiv = regx.substring(0, regx.indexOf(regxArray[regxArray.length - j - 2] + "-")) + ",";
                }
            }

            if (pDiv != "") {
                for (var i = 0; i < checkBoxs.length; i++) {
                    var element = checkBoxs[i];
                    if (element.name == "id" && element.type == 'checkbox') {
                        if (pDiv.indexOf(element.id + ",") != -1) {
                            element.checked = false;
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
                return true;
            }
        }
    }
    return false;
}
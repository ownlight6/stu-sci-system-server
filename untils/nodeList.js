// 节点
function Node(data, sno, name, next) {
    this.data = data;
    this.sno = sno;
    this.name = name
    this.next = next;
}

// 链表
function NodeList(node) {
    this.length = 0;
    this.next = node;
}

// 创建链表（尾插法）
function CreateList(data, sno, name) {
    var list = new NodeList(null);
    var p = list;
    for (var i = 0; i < data.length; i++) {
        var node = new Node(data[i], sno[i], name[i], null);
        p.next = node;
        p = node;
        list.length++;
    }
    return list
}

//单链表遍历
function displayList(head) {
    let result = [];
    let currNode = head;

    while (currNode) {
        if (currNode.next) {
            let obj = {}
            obj.data = currNode.data;
            obj.sno = currNode.sno;
            obj.name = currNode.name
            result.push(obj)
        }
        currNode = currNode.next;
    }
    return result;
}

// 快速排序，获取中点时，链表被断开成等分的两半，返回的是各部分的首节点
function sortList(head) {

    if (!head || !head.next) return head;

    return sort(head);

    function sort(linkHead) {
        if (!linkHead || !linkHead.next) return linkHead;
        let [head1, head2] = getMid(linkHead);
        head1 = sort(head1);
        head2 = sort(head2);
        return merge(head1, head2);
    }

    function merge(head1, head2) {
        if (!head1 || !head2) return head1 || head2;

        let linkHead = null;
        let list = null;
        while (head1 && head2) {
            if (head1.data > head2.data) {
                if (!linkHead) {
                    linkHead = list = head1;
                } else {
                    list.next = head1;
                    list = list.next;
                }
                head1 = head1.next;
            } else {
                if (!linkHead) {
                    linkHead = list = head2;
                } else {
                    list.next = head2;
                    list = list.next;
                }
                head2 = head2.next;
            }
        }

        if (head1) {
            list.next = head1;
        }

        if (head2) {
            list.next = head2;
        }

        return linkHead;
    }

    function getMid(linkHead) {
        if (!linkHead) return [null, null];
        let p = q = linkHead;
        let pre;
        while (p && q) {
            pre = p;
            p = p.next;
            q = q.next ? q.next.next : q.next;
        }
        let head1 = pre && pre.next;
        if (pre) pre.next = null;
        return [linkHead, head1];
    }
};

module.exports = {
    CreateList, sortList, displayList
}